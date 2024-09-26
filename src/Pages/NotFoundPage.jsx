import React from "react";
import * as Ant from "antd";
import { Col, Divider, Row } from 'antd';
import CustomContent from "@/components/common/CustomContent";
const NotFoundPage = () => {
  return (
    <>
      <CustomContent height="85vh" Shadow>
        <Ant.Result
          status="404"
          title="404"
          subTitle="اوه... این صفحه وجود نداره !"
        />
      </CustomContent>
    </>
  );
};
export default NotFoundPage;
