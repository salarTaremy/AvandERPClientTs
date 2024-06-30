import React from "react";
import * as Ant from "antd";
const NotFoundPage = () => {
  return (
    <Ant.Card>
      <Ant.Result
    status="404"
    title="404"
    subTitle="اوه... این صفحه وجود نداره !"
  />
    </Ant.Card>
  );
};
export default NotFoundPage;
