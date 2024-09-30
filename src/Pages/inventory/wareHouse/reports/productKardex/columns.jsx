import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
const getDocumentTypeProp = (documentTypeNature) => {
  switch (documentTypeNature) {
    case 1:
      return {color:"green" ,title:"وارده" , className:"text-green-600",operator:" +"};
    case -1:
      return {color:"red" ,title:"صادره", className:"text-red-600",operator:" -"};
      default:
        return {color:"blue" ,title:"خنثی", className:"",operator:""};
  }
};
const columns = () => {
  return [

    {
      title: "تاریخ",
      dataIndex: "issueDate",
      key: "issueDate",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
      render: (text, record) => `${record.issueTime.substr(0, 8)} - ${record.issueDate} `,
    },
    {
      title: "شماره برگه",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      width: 30,
      className: "text-xs sm:text-sm",
    },
    // {
    //   title: "کد محصول",
    //   dataIndex: "productCode",
    //   key: "productCode",
    //   width: 80,
    //   className: "text-xs sm:text-sm",
    // },
    {
      title: "سری ساخت",
      dataIndex: "batchNumber",
      key: "batchNumber",
      width: 40,
      align:'center',
      className: "text-xs sm:text-sm",
    },
    {
      title: "شرح",
      dataIndex: "inventoryDocumentTypeName",
      key: "inventoryDocumentTypeName",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
          {record?.inventoryDocumentTypeName}
          {' '}
            {record?.isReserve && <Ant.Tag
              bordered={false}
              color={'orange'}
            >
              {'رزرو'}
            </Ant.Tag>}
          </>)
      }


    },
    {
      title: "نوع گردش",
      dataIndex: "inventoryDocumentTypeName",
      key: "inventoryDocumentTypeName",
      width: 30,
      className: "text-xs sm:text-sm",
      align: "center",
      render: (text, record, index) => {
        return (
          <>

            {/* {record?.documentTypeNature === 1   ? <MdOutlineFileDownload/> : <MdOutlineFileUpload/>} */}
            <Ant.Tag
              bordered={false}
              color={getDocumentTypeProp(record?.documentTypeNature).color}
            >
              {getDocumentTypeProp(record?.documentTypeNature).title}
            </Ant.Tag>

          </>
        );
      },
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      key: "quantity",
      width: 50,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Typography.Text className={getDocumentTypeProp(record?.documentTypeNature).className}>

              {record.quantity}
              {getDocumentTypeProp(record?.documentTypeNature).operator}
            </Ant.Typography.Text>
          </>
        )
      }
    },
    {
      title: "مانده",
      dataIndex: "balance",
      key: "balance",
      width: 50,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Typography.Text className='text-blue-600'>
              {record.balance}
            </Ant.Typography.Text>
          </>
        )
      }
    },
  ];
};

export default columns;
