import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import { getAthlete, getEquipment } from "../../utilities/strava";
import { authContext } from "../context/provider";

// ESSENTIALS
// Bags
// Pumps & CO2
// Lights
// Maintenance & Cleaning
// Tools
// Bells
// Bottles & Cages
// Car Racks
// Shop All
// RIDER ACCESSORIES
// Helmets
// Shoes
// Sunglasses & Goggles
// Gloves
// Socks
// Caps & Hats
// Warmers
// Protection
// Shoe Covers
// Shop All

const GearPage = ({ location }) => {
  const [bikes, setBikes] = useState();
  const [accessories, setAccessories] = useState([
    {
      category: "performance",
      have: [
        {
          type: "trainer",
          brand: "wahoo",
          item: "kickr snap",
        },
        {
          type: "computer",
          brand: "garmin",
          item: "edge 530 plus",
        },
        {
          type: "sensor",
          brand: "wahoo",
          item: "rpm cadence",
        },
        {
          type: "sensor",
          brand: "wahoo",
          item: "rpm speed",
        },
        {
          type: "heart rate monitor",
          brand: "wahoo",
          item: "tickr",
        },
      ],
      wishlist: [
        {
          type: "power meter",
          brand: "garmin",
          item: "rally rs200 power meter pedals",
        },
      ],
    },
    {
      category: "essentials",
      have: [
        {
          type: "bags",
          brand: "lead out!",
          item: "mini handlebar bag",
        },
        {
          type: "pumps",
          brand: "lezyne",
          item: "road drive pump",
        },
        {
          type: "lights",
          brand: "knog",
          item: "mid cobber rear light",
        },
        {
          type: "lights",
          brand: "lezyne",
          item: "mini drive 400xl",
        },
        {
          type: "tools",
          brand: "crankbrothers",
          item: "m19 multitool",
        },
        {
          type: "bells",
          brand: "spurcycle",
          item: "original bell",
        },
      ],
      wishlist: [],
    },
  ]);
  // const [clothing, setClothing] = useState();
  const { makeStravaRequest } = useContext(authContext);
  const [item, setItem] = useState("Use hooks!");
  const [tasks, setTasks] = useState(accessories);

  const addTask = (item) => {
    const newItem = { type: "asd", brand: "dsa", item: item };
    setAccessories([...accessories, newItem]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(item);
    setItem("");
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const getData = async () => {
    try {
      const res = await makeStravaRequest("GET", getAthlete);
      if (res.ok) {
        const athleteData = await res.json();
        const equipmentData = await Promise.all(
          athleteData.bikes.map(async ({ id }) => {
            try {
              const resId = await makeStravaRequest("GET", getEquipment(id));
              if (resId.ok) {
                return await resId.json();
              }
            } catch (error) {
              console.log(error);
            }
          })
        );
        setBikes(equipmentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout location={location}>
      <div>
        <div>
          <h2 className="uppercase text-md text-green-900 font-medium">
            bikes
          </h2>
          <div>
            {bikes?.map((bike) => {
              const { id, brand_name, converted_distance, model_name } = bike;
              return (
                <div key={id} className="bg-beige-400 my-5 p-4 lowercase">
                  <h3>
                    <span className="uppercase text-xs mr-2">brand</span>
                    {brand_name}
                  </h3>
                  <p>
                    <span className="uppercase text-xs mr-2">model name</span>
                    {model_name}
                  </p>
                  <p>
                    <span className="uppercase text-xs mr-2">
                      total distance
                    </span>
                    <span className="font-spline">{converted_distance}</span>km
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="uppercase text-md text-green-900 font-medium">
            accessories
          </h2>

          {accessories?.map((category, index) => {
            return (
              <div className="my-5 p-4 bg-green-50">
                <h3 className="uppercase text-sm text-green-900 font-medium">
                  {category.category}
                </h3>
                <div>
                  {category.have.map((eachHaveItem, index) => {
                    return (
                      <div key={`have-${index}`}>
                        <p>
                          <span className="uppercase text-xs mr-2">
                            {eachHaveItem.type}
                          </span>
                          {eachHaveItem.brand} {eachHaveItem.item}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="uppercase text-sm font-medium mt-2 mr-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span>wishlist</span>
                  </h3>
                  <div>
                    {category.wishlist.map((eachWishlistItem, index) => {
                      return (
                        <div key={`wishlist-${index}`}>
                          <p>
                            <span className="uppercase text-xs mr-2">
                              {eachWishlistItem.type}
                            </span>
                            {eachWishlistItem.brand} {eachWishlistItem.item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <form onSubmit={handleSubmit} key={category[index]}>
                  <input
                    type="text"
                    name={category[index]}
                    value={item}
                    onChange={handleChange}
                  ></input>
                  <button type="submit">add</button>
                </form> */}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GearPage;
