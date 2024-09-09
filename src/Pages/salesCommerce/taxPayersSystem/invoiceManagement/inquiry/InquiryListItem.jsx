import React from "react";
import { useSelector } from "react-redux";
import * as Ant from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { TbMoodSadSquint } from "react-icons/tb";
import { TbMoodConfuzed } from "react-icons/tb";
import { RightOutlined } from "@ant-design/icons";
//====================================================================
//                        Declaration
//====================================================================
const InquiryListItem = (props) => {
  const { inquiryData } = props;
  const themeName = useSelector((state) => state.theme);
  const errorCardClassName =
    themeName == "dark"
      ? "transparent border-red-400 text-stone-100"
      : "bg-rose-50 border-red-100";

  const warningCardClassName =
    themeName == "dark"
      ? "transparent border-orange-400 text-stone-100"
      : "bg-orange-50 border-orange-100";

  const collapseIconTextColorClassName =
    themeName == "dark" ? "text-slate-300" : "text-slate-600";
  //====================================================================
  //                        Functions
  //====================================================================
  let itemList = [];

  const getStatusTagColor = (statusId) => {
    switch (statusId) {
      case 1:
        return "green";
      case 2:
        return "red";
      case 3:
        return "orange";
      case 4:
        return "volcano";
      case 5:
        return "geekblue";
      default:
        return "gray";
    }
  }

  //map inquiry result and create timeline item for each result
  inquiryData?.inquiryResultDetailList?.map((inquiryItem) => {
    //====================================================
    //    create list items for errors
    //====================================================
    const renderErrorList = (errorItem) => {
      return (
        <Ant.List.Item key={errorItem.id} style={{ borderBlockEnd: "none" }}>
          <Ant.Card
            className={errorCardClassName}
            style={{
              width: "100%",
              boxShadow: "none",
            }}
          >
            <Ant.List.Item.Meta
              avatar={
                <Ant.Avatar
                  className="text-rose-600"
                  style={{ backgroundColor: "transparent" }}
                  icon={<TbMoodSadSquint size="middle" />}
                />
              }
              title={
                <Ant.Typography.Text className="text-rose-600">
                  {errorItem.code}
                </Ant.Typography.Text>
              }
              description={
                <Ant.Typography.Text>{errorItem.message}</Ant.Typography.Text>
              }
            />
          </Ant.Card>
        </Ant.List.Item>
      );
    };

    //====================================================
    //    create list items for warnings
    //====================================================
    const renderWarningList = (warningItem) => {
      return (
        <Ant.List.Item key={warningItem.id} style={{ borderBlockEnd: "none" }}>
          <Ant.Card
            className={warningCardClassName}
            style={{
              width: "100%",
              boxShadow: "none",
            }}
          >
            <Ant.List.Item.Meta
              avatar={
                <Ant.Avatar
                  className="text-orange-400"
                  style={{ backgroundColor: "transparent" }}
                  icon={<TbMoodConfuzed size="middle" />}
                />
              }
              title={
                <Ant.Typography.Text className="text-orange-400">
                  {warningItem.code}
                </Ant.Typography.Text>
              }
              description={
                <Ant.Typography.Text>{warningItem.message}</Ant.Typography.Text>
              }
            />
          </Ant.Card>
        </Ant.List.Item>
      );
    };

    //====================================================
    //    create list react-node for errors and warnings
    //====================================================
    const errorList = inquiryItem.errorList?.length > 0 && (
      <Ant.List
        dataSource={inquiryItem?.errorList}
        renderItem={renderErrorList}
      />
    );

    const warningList = inquiryItem.warningList?.length > 0 && (
      <Ant.List
        dataSource={inquiryItem.warningList}
        renderItem={renderWarningList}
      />
    );

    //====================================================
    //    create collapse children foreach inquiry result
    //====================================================
    const errorCount = inquiryItem.errorList?.length;
    console.log(errorCount);
    const warningCount = inquiryItem.warningList?.length;
    const errorCountTag = (errorCount > 0 && <Ant.Tag color="red" bordered={false}>{`${errorCount} خطا`}</Ant.Tag>);
    const warningCountTag = (warningCount > 0 && <Ant.Tag color="orange" bordered={false}>{`${warningCount} اخطار`}</Ant.Tag>);
    const inquiryStatusTag = (
      <Ant.Tag color={getStatusTagColor(inquiryItem.statusId)}>
        {inquiryItem.status}
      </Ant.Tag>
    );
    const showArrow = errorCount > 0 || warningCount > 0;

    itemList.push({
      key: inquiryItem.id,
      label: (
        <>
          <Ant.Space size="middle">
            <ClockCircleOutlined
              className={collapseIconTextColorClassName}
              // style={{ fontSize: "16px" }}
            />
            <Ant.Typography.Text
              strong
              className={collapseIconTextColorClassName}
            >
              {`ارسال به سامانه در تاریخ ${inquiryItem.date} ساعت ${inquiryItem.time}`}
            </Ant.Typography.Text>
            {(errorCount === 0 || !errorCount ) && inquiryStatusTag}
            {errorCountTag}
            {warningCountTag}
          </Ant.Space>
        </>
      ),
      children: (
        <>
          {errorList}
          {warningList}
        </>
      ),
      showArrow: showArrow,
      collapsible: `${!showArrow ? "disabled" : ""}`,
    });
  });

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Collapse
      items={itemList}
      expandIconPosition="end"
      expandIcon={({ isActive }) => {
        return (
          <RightOutlined
            rotate={isActive ? -90 : 0}
            className={collapseIconTextColorClassName}
          />
        );
      }}
    />
  );
};

export default InquiryListItem;
