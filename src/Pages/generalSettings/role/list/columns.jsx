import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { VscGithubAction } from "react-icons/vsc";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import { CgMoreVertical } from "react-icons/cg";
import { BsMenuButtonWideFill } from "react-icons/bs";
import * as defaultValues from "@/defaultValues";


const columns = (onDelete, onEdit, onView, onInfo, onAction, onMenu, onSwitch) => {
  const getMenuItems = (val) => [
    {
      key: '1',
      label: (
        <Ant.Tooltip placement="right" title={'دسترسی منو'}>
          <a onClick={() => onMenu(val)}><BsMenuButtonWideFill className="text-indigo-600" /></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: '2',
      label: (
        <Ant.Tooltip placement="right" title={'ویرایش عملیات(Actions)'}>
          <a onClick={() => onSwitch(val)}><VscGithubAction className="text-violet-600" /></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: '3',
      label: (
        <Ant.Tooltip placement="right" title={'مشاهده عملیات(Actions)'}>
          <a onClick={() => onAction(val)}><VscGithubAction className="text-fuchsia-600" /></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: '4',
      label: (
        <Ant.Tooltip placement="right" title={'کاربران مشمول این نقش'}>
          <a onClick={() => onInfo(val)}><LuUser2 className="text-cyan-600" /></a>
        </Ant.Tooltip>
      ),
    },
  ];


  return [
    // {
    //   title: "شناسه",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    //   fixed:true,
    //   align: "center",
    //   className:"text-xs sm:text-sm",
    // },
    {
      title: "نام نقش",
      dataIndex: "name",
      key: "name",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "عنوان نقش",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "عنوان محدوده نقش",
      dataIndex: "roleScopePersianTitle",
      key: "roleScopePersianTitle",
      width: 100,
      className: "text-xs sm:text-sm",
    },

    {
      title: "نوع دسترسی نقش",
      dataIndex: "isDenied",
      key: "isDenied",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Tag
          color={(record.isDenied == false && "green") || "red"}
          key={record.id}
          bordered={false}
        >
          {" "}
          {(record.isDenied == false && "دسترسی مجاز") || " عدم دسترسی"}{" "}
        </Ant.Tag>
      ),
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Space>
            <Ant.Dropdown
              menu={{
                items: getMenuItems(val),
              }}
              placement="bottom"
              arrow
            >
              <Ant.Button
                className="text-blue-600"
                icon={<CgMoreVertical />}
                color="default"
                variant="filled"
              />
            </Ant.Dropdown>
            <Ant.Button
              onClick={() => onEdit(val)}
              className="text-blue-600"
              icon={<FiEdit />}
              color="default"
              variant="filled"
            />
            <Ant.Popconfirm
              onConfirm={() => onDelete(val.id)}
              title={` برای حذف نقش  "${val.persianTitle}" مطمئن هستید؟`}
            >
              <Ant.Button
                className="text-rose-600"
                icon={<RiDeleteBin6Line />}
                color="danger"
                variant="filled"
              />
            </Ant.Popconfirm>
          </Ant.Space>
        </>
      ),
    },
  ];
};

export default columns;
