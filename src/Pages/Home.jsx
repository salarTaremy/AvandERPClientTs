import React, { useEffect } from "react";
import * as Ant from "antd";
import * as url from "../api/url";
import * as api from "../api";
import useRequestManager from "../hooks/useRequestManager";

import { useFetch, useFetchWithHandler } from "../api";
import { json } from "react-router-dom";

const Home = () => {
  
  const [data, loading, error, call] = useFetchWithHandler();
  useRequestManager({error})

  useEffect(() => {
    call(url.ACCOUNT);
  }, []);
  return (
    <Ant.Card>
      <p>{JSON.stringify(data?.data)}</p>
      <p>{loading && "Loading"}</p>
      <p>{error && "error"}</p>
      <p>{error && "error"}</p>
    </Ant.Card>
  );
};
export default Home;
