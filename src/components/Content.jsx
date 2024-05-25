import React from "react";
import { Layout, theme, Card } from "antd";
import routes from "./../routes";

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  Routes,
  Link,
} from "react-router-dom";


const ContentComponent = () => {
  return (
    <Layout.Content  className="content max-[360px]:m-0">
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          );
        })}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout.Content>
  );
};
export default ContentComponent;
