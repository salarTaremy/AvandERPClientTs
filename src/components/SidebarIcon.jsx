import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as AntIcons from "@ant-design/icons";
import * as Hi2 from "react-icons/hi2";
import * as Lia from "react-icons/lia";
import * as Io5 from "react-icons/io5";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Bi from "react-icons/bi";
import * as Ci from "react-icons/ci";
import * as Cg from "react-icons/cg";
import * as Io from "react-icons/io";
import * as Fa from "react-icons/fa";
import * as Lu from "react-icons/lu";
import * as Md from "react-icons/md";
import * as Gr from "react-icons/gr";
import * as Si from "react-icons/si";
import * as Tb from "react-icons/tb";
import * as Ri from "react-icons/ri";
import * as Fi from "react-icons/fi";
import * as Pi from "react-icons/pi";
import * as Im from "react-icons/im";
import * as Go from "react-icons/go";
import * as Hi from "react-icons/hi";




const SidebarIcon = ({ iconName }) => {
    const className = "ml-2  text-blue-600  size-4"
    const color = ""


    switch (iconName) {
        case 'LuBookUp':
            return <Lu.LuBookUp className={className} color={color} />;
        case 'LuBookMarked':
            return <Lu.LuBookMarked className={className} color={color} />;
        case 'LuBookOpenCheck':
            return <Lu.LuBookOpenCheck className={className} color={color} />;
        case 'LuBookLock':
            return <Lu.LuBookLock className={className} color={color} />;
        case 'AiOutlineBook':
            return <Ai.AiOutlineBook className={className} color={color} />;
        case 'MdOutlineInventory':
            return <Md.MdOutlineInventory className={className} color={color} />;
        case 'AiOutlineProduct':
            return <Ai.AiOutlineProduct className={className} color={color} />;
        case 'MdOutlineWarehouse':
            return <Md.MdOutlineWarehouse className={className} color={color} />;
        case 'GrDocumentPerformance':
            return <Gr.GrDocumentPerformance className={className} color={color} />;
        case 'GrDocumentOutlook':
            return <Gr.GrDocumentOutlook className={className} color={color} />;
        case 'HiOutlineDocumentChartBar':
            return <Hi2.HiOutlineDocumentChartBar className={className} color={color} />;
        case 'GrUserSettings ':
            return <Gr.GrUserSettings className={className} color={color} />;
        case 'SiAmazondocumentdb':
            return <Si.SiAmazondocumentdb className={className} color={color} />;
        case 'GrDocumentNotes':
            return <Hi2.GrDocumentNotes className={className} color={color} />;
        case 'HiOutlineBanknotes':
            return <Hi2.HiOutlineBanknotes className={className} color={color} />;
        case 'CiBank':
            return <Ci.CiBank className={className} color={color} />;
        case 'BsPiggyBank':
            return <Bs.BsPiggyBank className={className} color={color} />;
        case 'TbCashBanknote':
            return <Tb.TbCashBanknote className={className} color={color} />;
        case 'MdOutlineCommentBank':
            return <Md.MdOutlineCommentBank className={className} color={color} />;
        case 'LuBanknote':
            return <Lu.LuBanknote className={className} color={color} />;
        case 'FaCommentDollar':
            return <Fa.FaCommentDollar className={className} color={color} />;
        case 'BiCommentCheck':
            return <Bi.BiCommentCheck ntBank className={className} color={color} />;
        case 'BiCommentDetail':
            return <Bi.BiCommentDetail className={className} color={color} />;
        case 'BiCommentEdit':
            return <Bi.BiCommentEdit className={className} color={color} />;
        case 'MdOutlinePayment':
            return <Md.MdOutlinePayment className={className} color={color} />;
        case 'RiSecurePaymentLine':
            return <Ri.MdOutlinePaRiSecurePaymentLineyment className={className} color={color} />;
        case 'LiaCommentsDollarSolid':
            return <Lia.LiaCommentsDollarSolid className={className} color={color} />;
        case 'LiaComment':
            return <Lia.LiaComment className={className} color={color} />;
        case 'LiaComments':
            return <Lia.LiaComments className={className} color={color} />;
        case 'FiUsers':
            return <Fi.FiUsers className={className} color={color} />;
        case 'GrUserSettings':
            return <Gr.GrUserSettings className={className} color={color} />;
        case 'RiUserStarLine':
            return <Ri.RiUserStarLine className={className} color={color} />;
        case 'PiMoneyWavyThin':
            return <Pi.PiMoneyWavyThin className={className} color={color} />;
        case 'CiCircleList':
            return <Ci.CiCircleList className={className} color={color} />;
        case 'ImMakeGroup':
            return <Im.ImMakeGroup className={className} color={color} />;
        case 'MdOutlineCoffeeMaker':
            return <Md.MdOutlineCoffeeMaker className={className} color={color} />;
        case 'LuFolderSync':
            return <Lu.LuFolderSync className={className} color={color} />;
        case 'BsBackpack':
            return <Bs.BsBackpack className={className} color={color} />;
        case 'BsBoundingBox':
            return <Bs.BsBoundingBox className={className} color={color} />;
        case 'AiOutlineDashboard':
            return <Ai.AiOutlineDashboard className={className} color={color} />;
        case 'IoColorPaletteOutline':
            return <Io5.IoColorPaletteOutline className={className} color={color} />;
        case 'RiFontColor':
            return <Ri.RiFontColor className={className} color={color} />;
        case 'AiOutlineUserSwitch':
            return <Ai.AiOutlineUserSwitch className={className} color={color} />;
        case 'GrDocumentTest':
            return <Gr.GrDocumentTest className={className} color={color} />;
        case 'GrDocumentCloud':
            return <Gr.GrDocumentCloud className={className} color={color} />;
        case 'LuUsers2':
            return <Lu.LuUsers2 className={className} color={color} />;
        case 'TbBrandAirtable':
            return <Tb.TbBrandAirtable className={className} color={color} />;
        case 'IoIosGitBranch':
            return <Io.IoIosGitBranch className={className} color={color} />;
        case 'TbFileReport':
            return <Tb.TbFileReport className={className} color={color} />;
        case 'FaBalanceScale':
            return <Fa.FaBalanceScale className={className} color={color} />;
        case 'FaUncharted':
            return <Fa.FaUncharted className={className} color={color} />;
        case 'PiChartLineDownLight':
            return <Pi.PiChartLineDownLight className={className} color={color} />;
        case 'IoAccessibilityOutline':
            return <Io5.IoAccessibilityOutline className={className} color={color} />;
        case 'RiUserSettingsLine':
            return <Ri.RiUserSettingsLine className={className} color={color} />;
        case 'CgChanel':
            return <Cg.CgChanel className={className} color={color} />;
        case 'MdOutlinePayment':
            return <Md.MdOutlinePayment className={className} color={color} />;
        case 'GoShieldLock':
            return <Go.GoShieldLock className={className} color={color} />;
        case 'CgDollar':
            return <Cg.CgDollar className={className} color={color} />;
        case 'AiOutlineDeliveredProcedure':
            return <Ai.AiOutlineDeliveredProcedure className={className} color={color} />;
        case 'GrDocumentConfig':
            return <Gr.GrDocumentConfig className={className} color={color} />;
        case 'GrDocumentImage':
            return <Gr.GrDocumentImage className={className} color={color} />;
        case 'TbUsersGroup':
            return <Tb.TbUsersGroup className={className} color={color} />;
        case 'TiGroupOutline':
            return <Ti.TiGroupOutline className={className} color={color} />;
        case 'GiLevelEndFlag':
            return <Gi.GiLevelEndFlag className={className} color={color} />;
        case 'HiOutlineReceiptTax':
            return <Hi.HiOutlineReceiptTax className={className} color={color} />;
        case 'GrDocumentStore':
            return <Gr.GrDocumentStore className={className} color={color} />;
        case 'LuFileLock':
            return <Lu.LuFileLock className={className} color={color} />;
        case 'GrDocumentRtf':
            return <Gr.GrDocumentRtf className={className} color={color} />;
        case 'PiCity':
            return <Pi.PiCity className={className} color={color} />;
        case 'RiUserLocationLine':
            return <Ri.RiUserLocationLine className={className} color={color} />;
        case 'FiSettings':
            return <Fi.FiSettings className={className} color={color} />;
        case 'RiFundsLine':
            return <Ri.RiFundsLine className={className} color={color} />;
        case 'FaRegUserv':
            return <Fa.FaRegUser className={className} color={color} />;
        case 'FaRegObjectUngroup':
            return <Fa.FaRegObjectUngroup className={className} color={color} />;
        case 'BsFiletypeDoc':
            return <Bs.BsFiletypeDoc className={className} color={color} />;
        case 'HiOutlineDocumentReport':
            return <Hi.HiOutlineDocumentReport className={className} color={color} />;
        case 'MdOutlineAddchart':
            return <Md.MdOutlineAddchart className={className} color={color} />;
        case 'AiOutlinePieChart':
            return <Ai.AiOutlinePieChart className={className} color={color} />;
        case 'BiNetworkChart':
            return <Bi.BiNetworkChart className={className} color={color} />;
        case 'MdAddChart':
            return <Md.MdAddChart className={className} color={color} />;


        default:
            return <Fa.FaRegFolder className={className} color={color} />;

    }
}

export default SidebarIcon;

