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

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content className="content">
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
    </Content>
  );
};
export default ContentComponent;
