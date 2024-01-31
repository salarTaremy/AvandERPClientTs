import React, { useEffect } from "react";
import * as Ant from "antd";

import Test from "@/components/Test";
import * as url from "../api/url";
import * as api from "../api";
// import useRequestManager from "../hooks/useRequestManager";

import { useFetch, useFetchWithHandler } from "../api";
import { json } from "react-router-dom";

//useRequestManager()
const Home = () => {
  //useRequestManager
  const [data, loading, error, call] = useFetchWithHandler();

  useEffect(() => {
    call(url.ACCOUNT);
  }, []);
  return (
    <Ant.Card>
      <Test />
      <p>{JSON.stringify(data?.data)}</p>
      <p>{loading && "Loading"}</p>
      <p>{error && "error"}</p>
      <p>{error && "error"}</p>
    </Ant.Card>
  );
};
export default Home;
