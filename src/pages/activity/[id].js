import React from "react";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";

const ActivityPage = ({ location }) => {
  const {
    state: { activity },
  } = location;
  console.log(activity);
  const { name } = activity;

  useEffect(() => {}, []);

  return (
    <Layout>
      <p>activity page</p>
      {name}
    </Layout>
  );
};

export default ActivityPage;
