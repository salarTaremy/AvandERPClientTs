import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import * as Ant from 'antd'
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
          },
          {
            title: "0-0-0-1",
            key: "0-0-0-1",
          },
          {
            title: "0-0-0-2",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-0",
            key: "0-0-1-0",
          },
          {
            title: "0-0-1-1",
            key: "0-0-1-1",
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      {
        title: "0-1-0-0",
        key: "0-1-0-0",
      },
      {
        title: "0-1-0-1",
        key: "0-1-0-1",
      },
      {
        title: "0-1-0-2",
        key: "0-1-0-2",
      },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];
const Menus = () => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [items, setItems] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [data, loading, error, apiCall] = useFetchWithHandler();

  useEffect(() => {
    apiCall(url.NAV_MENU_TREE);
  }, []);

  useEffect(() => {
    const dataList = data?.data[0]?.children;
    setItems(dataList);
  }, [data?.data]);

  useRequestManager({ error });
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };
  return (
    <Ant.Card Card title={"دسترسی منوها"} type="inner">
      <Ant.Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={items}
      />
    </Ant.Card>
  );
};
export default Menus;
