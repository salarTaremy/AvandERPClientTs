import React from "react";
import * as Ant from "antd";
import { Col, Divider, Row } from 'antd';
import CoustomContent from "@/components/common/CoustomContent";
const NotFoundPage = () => {
  return (
    <>
      <CoustomContent height="85vh" Shadow>
        <Ant.Result
          status="404"
          title="404"
          subTitle="اوه... این صفحه وجود نداره !"
        />
      </CoustomContent>
    </>
  );
};
export default NotFoundPage;
