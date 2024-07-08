import React from "react";
import * as Ant from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";

//====================================================================
//                        Declaration
//====================================================================
const InquiryTimelineItem = (props) => {
  const { inquiryData } = props;
  //====================================================================
  //                        Functions
  //====================================================================
  let timelineItemList = [];

  //this is workaround to show the timeline tail for the last child
  timelineItemList.push({ dot: <></>, chidlren: "" });

  //map inquiry result and create timeline item for each result
  inquiryData?.inquiryResultDetailList?.map((inquiryItem) => {
    const errorList = inquiryItem.errorList?.map((errorItem) => {
      const errorMessage = `${errorItem.code} - ${errorItem.message}`;
      return <Ant.Alert message={errorMessage} type="error" showIcon />;
    });

    const warningList = inquiryItem.warningList?.map((warningItem) => {
      const warningMessage = `${warningItem.code} - ${warningItem.message}`;
      return <Ant.Alert message={warningMessage} type="warning" showIcon />;
    });

    //create collapse item to show error and warning list for each inquiry result
    const collapseItems = [
      {
        key: "1",
        label: (
          <Ant.Typography.Text>{`خطا (${inquiryItem.errorList?.length})`}</Ant.Typography.Text>
        ),
        children: (
          <Ant.Space
            direction="vertical"
            size="middle"
            block={true}
            style={{ width: "100%" }}
          >
            {errorList}
          </Ant.Space>
        ),
      },
      {
        key: "2",
        label: (
          <Ant.Typography.Text>{`اخطار (${inquiryItem.warningList?.length})`}</Ant.Typography.Text>
        ),
        children: (
          <Ant.Space
            direction="vertical"
            size="middle"
            block={true}
            style={{ width: "100%" }}
          >
            {warningList}
          </Ant.Space>
        ),
      },
    ];

    //create timeline children foreach inquiry result
    const timelineChildren = (
      <>
        <Ant.Typography.Text className="text-cyan-500">{`ارسال به سامانه در تاریخ ${inquiryItem.date} ساعت ${inquiryItem.time}`}</Ant.Typography.Text>
        <Ant.Collapse
          ghost
          bordered={false}
          items={collapseItems}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              style={{ color: "rgb(156 163 175)" }}
              rotate={isActive ? 90 : 0}
            />
          )}
        />
      </>
    );

    timelineItemList.push({
      dot: <ClockCircleOutlined className="text-cyan-500" />,
      children: timelineChildren,
    });
  });

  return <Ant.Timeline items={timelineItemList} reverse={true} />;
};

export default InquiryTimelineItem;
