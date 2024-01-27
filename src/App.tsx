import React from "react";
import Layout from "./components/Layout";
import { createContext, useContext, useState } from "react";
export const UserContext = createContext("dddd");
const App: React.FC = () => {
  return (
    <div>

      <UserContext.Provider value="Reed">
        <Layout />
      </UserContext.Provider>
    </div>
  );
};

export default App;
