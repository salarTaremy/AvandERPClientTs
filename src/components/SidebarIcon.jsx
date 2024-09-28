import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as AntIcons from "@ant-design/icons";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Bi from "react-icons/bi";
import * as Ci from "react-icons/ci";
import * as Cg from "react-icons/cg";
import * as Fa from "react-icons/fa";
import * as Lu from "react-icons/lu";
import * as Md from "react-icons/md";
import * as Gr from "react-icons/gr";
import * as Hi2 from "react-icons/hi2";
import * as Si from "react-icons/si";



const SidebarIcon = ({ iconName }) => {
    const className = "ml-2"


    switch (iconName) {
        case 'LuBookUp':
            return <Lu.LuBookUp className={className} />;
        case 'LuBookMarked':
            return <Lu.LuBookMarked className={className} />;
        case 'LuBookOpenCheck':
            return <Lu.LuBookOpenCheck className={className} />;
        case 'LuBookLock':
            return <Lu.LuBookLock className={className} />;
        case 'AiOutlineBook':
            return <Ai.AiOutlineBook className={className} />;
        case 'MdOutlineInventory':
            return <Md.MdOutlineInventory className={className} />;
        case 'AiOutlineProduct':
            return <Ai.AiOutlineProduct className={className} />;
        case 'MdOutlineWarehouse':
            return <Md.MdOutlineWarehouse className={className} />;
        case 'GrDocumentPerformance':
            return <Gr.GrDocumentPerformance className={className} />;
        case 'GrDocumentOutlook':
            return <Gr.GrDocumentOutlook className={className} />;
        case 'HiOutlineDocumentChartBar':
            return <Hi2.HiOutlineDocumentChartBar className={className} />;
        case 'GrUserSettings ':
            return <Gr.GrUserSettings className={className} />;
        case 'SiAmazondocumentdb ':
            return <Si.SiAmazondocumentdb className={className} />;



        default:
            return <Fa.FaRegFolder className={className} />;

    }
}

export default SidebarIcon;

