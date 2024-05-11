import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { VscGithubAction } from "react-icons/vsc";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";



const columns = (onDelete, onEdit, onView, onInfo, onAction, onMenu, onSwitch) => {
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
        >
          {" "}
          {(record.isDenied == false && "دسترسی مجاز") || " عدم دسترسی"}{" "}
        </Ant.Tag>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "center",
      fixed: "right",
      className: "text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <Ant.Tooltip placement="top" title={'ویرایش عملیات'}>
            <Ant.Button
              className="text-violet-600"
              onClick={() => onSwitch(val)}
              icon={<VscGithubAction />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={'عملیات'}>
            <Ant.Button
              className="text-green-600"
              onClick={() => onAction(val)}
              icon={<VscGithubAction />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={'دسترسی منو'}>
            <Ant.Button
              className="text-orange-600"
              onClick={() => onMenu(val)}
              icon={<AiOutlineMenu />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={'لیست کاربران'}>
            <Ant.Button
              className="text-purple-600"
              onClick={() => onInfo(val)}
              icon={<LuUser2 />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={'ویرایش'}>
            <Ant.Button
              onClick={() => onEdit(val)}
              className="text-blue-600"
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Tooltip>
          {/* <Ant.Button
            onClick={() => onView(val.id)}
            className="text-sky-600"
            icon={<GrView />}
            type="text"
          /> */}
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={` برای حذف نقش  "${val.persianTitle}" مطمئن هستید؟`}
          >
            <Ant.Tooltip placement="top" title={'حذف'}>
              <Ant.Button
                className="text-red-600"
                icon={<RiDeleteBin6Line />}
                type="text"
              />
            </Ant.Tooltip>
          </Ant.Popconfirm>
        </>
      ),
    },
  ];
};

export default columns;
