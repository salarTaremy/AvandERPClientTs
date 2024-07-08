import React from "react";
import PropTypes from "prop-types";
import * as style from "@/styles";
import {
  Button,
  Space,
  Tooltip,
  Dropdown,
  Menu,
  Popconfirm,
  Badge,
} from "antd";
import { FaFilter, FaFolderPlus } from "react-icons/fa6";
import { FiEdit, FiRefreshCw, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line, RiSave3Fill, RiSaveLine ,RiSave3Line } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
//Example For Items:
//const items = [{ icon: <MailOutlined />, className: 'text-red-600', onClick: () => {}, children: 'Click Me !' }]

const ButtonBar = (props) => {
  const { items } = props;
  const { onAdd, onEdit, onDelete, onFilter, onRefresh, btnSubmit } = props;
  const {
    addTooltip,
    editTooltip,
    deleteTooltip,
    refreshTooltip,
    filterTooltip,
    savedTooltip,
  } = props;
  const { onDeleteConfirmMessage, filterCount } = props;
  const iconOnly = true;
  const size = iconOnly ? "large" : "";
  //backgroundColor: color.green.primary
  //====================================================================
  //                        Child Components
  //====================================================================
  const BtnAdd = () => {
    return (
      onAdd && (
        <Tooltip
          title={iconOnly && (addTooltip || "ایجاد ایتم جدید")}
          size={size}
        >
          <Button
            onClick={onAdd}
            size={size}
            icon={<FaFolderPlus />}
            className="text-green-600 border-green-600"
          >
            {iconOnly || "ایتم جدید"}
          </Button>
        </Tooltip>
      )
    );
  };
  const BtnEdit = () => {
    return (
      onEdit && (
        <Tooltip
          title={iconOnly && (editTooltip || "ویرایش ایتم مورد نظر")}
          size={size}
        >
          <Button
            onClick={onEdit}
            size={size}
            icon={<FiEdit />}
            className="text-sky-600 border-sky-600"
          >
            {iconOnly || "ویرایش"}
          </Button>
        </Tooltip>
      )
    );
  };
  const BtnDelete = () => {
    return (
      onDelete && (
        <Tooltip title={iconOnly && (deleteTooltip || "حذف ایتم")} size={size}>
          <Popconfirm
            title="حذف"
            onConfirm={onDelete}
            description={onDeleteConfirmMessage || "آیا برای حذف مطمئن هستید؟"}
            okText="بلی"
            cancelText="خیر"
          >
            <Button
              size={size}
              icon={<RiDeleteBin6Line />}
              className="text-red-600 border-red-600"
            >
              {iconOnly || "حذف"}
            </Button>
          </Popconfirm>
        </Tooltip>
      )
    );
  };
  const BtnFilter = () => {
    return (
      onFilter && (
        <Tooltip title={iconOnly && (filterTooltip || "فیلتر")} size={size}>
          <Badge count={filterCount} color="purple">
            <Button
              onClick={onFilter}
              size={size}
              icon={<FiFilter />}
              className="text-purple-600 border-purple-600"
            >
              {iconOnly || "فیلتر"}
            </Button>
          </Badge>
        </Tooltip>
      )
    );
  };
  const BtnRefresh = () => {
    return (
      onRefresh && (
        <Tooltip title={iconOnly && (refreshTooltip || "بازخوانی")} size={size}>
          <Button
            onClick={onRefresh}
            size={size}
            icon={<FiRefreshCw />}
            className="text-blue-600 border-blue-600"
          >
            {iconOnly || "فیلتر"}
          </Button>
        </Tooltip>
      )
    );
  };
  const BtnSubmit = () => {
    return (
      btnSubmit && (
        <Tooltip title={iconOnly && (savedTooltip || "ذخیره")} size={size}>
          <Button
            onClick={btnSubmit}
            size={size}
            icon={<RiSave3Line   />}
            className="text-blue-600 border-blue-600"
          >
            {iconOnly || "ذخیره"}
          </Button>
        </Tooltip>
      )
    );
  };
  const MoreBtn = () => {
    return items?.map((item, i) => {
      return (
        <Button key={i} {...item} size={iconOnly && size}>
          {iconOnly || item.children}
        </Button>
      );
    });
  };
  const DropdownBtn = () => {
    return <></>;
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Space wrap>
        <BtnAdd />
        <BtnEdit />
        <BtnDelete />
        <BtnFilter />
        <BtnRefresh />
        <BtnSubmit />
        <MoreBtn />
        {props.children}
        <DropdownBtn />
      </Space>
    </>
  );
};

ButtonBar.propTypes = {
  items: PropTypes.arrayOf(Button),
  children: PropTypes.any,
  onDeleteConfirmMessage: PropTypes.string,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func,
  btnSubmit: PropTypes.func,
  filterCount: PropTypes.number,
};
export default ButtonBar;
