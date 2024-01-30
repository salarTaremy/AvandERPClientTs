import React from "react";
import { Layout, theme, Card } from "antd";
import Home from "./../Pages/Home";
import Dashboard from './../Pages/Dashboard'
import NotFoundPage from './../Pages/NotFoundPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
const { Content } = Layout;

const router = createBrowserRouter([
{path:"/", element:<Home/>},
{path:"/Dashboard", element:<Dashboard/>},
{path:"*", element:<NotFoundPage/>}
]);

const ContentComponent = () => {
  return (
    <Content className="content">
      <RouterProvider router={router} />
    </Content>
  );
};
export default ContentComponent;
