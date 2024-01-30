import React from "react";
import { Layout, theme, Card } from "antd";

import Home from "./../Pages/Home";
import Dashboard from "./../Pages/Dashboard";
import NotFoundPage from "./../Pages/NotFoundPage";

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
]);

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content className="content">
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Content>
  );
};
export default ContentComponent;
