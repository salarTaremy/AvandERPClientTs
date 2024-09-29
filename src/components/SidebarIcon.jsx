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
        case 'SiAmazondocumentdb':
            return <Si.SiAmazondocumentdb className={className} />;
        case 'GrDocumentNotes':
            return <Hi2.GrDocumentNotes className={className} />;
        case 'HiOutlineBanknotes':
            return <Hi2.HiOutlineBanknotes className={className} />;
        case 'CiBank':
            return <Ci.CiBank className={className} />;
        case 'BsPiggyBank':
            return <Bs.BsPiggyBank className={className} />;
        case 'TbCashBanknote':
            return <Tb.TbCashBanknote className={className} />;
        case 'MdOutlineCommentBank':
            return <Md.MdOutlineCommentBank className={className} />;
        case 'LuBanknote':
            return <Lu.LuBanknote className={className} />;
        case 'FaCommentDollar':
            return <Fa.FaCommentDollar className={className} />;
        case 'BiCommentCheck':
            return <Bi.BiCommentCheck ntBank className={className} />;
        case 'BiCommentDetail':
            return <Bi.BiCommentDetail className={className} />;
        case 'BiCommentEdit':
            return <Bi.BiCommentEdit className={className} />;
        case 'MdOutlinePayment':
            return <Md.MdOutlinePayment className={className} />;
        case 'RiSecurePaymentLine':
            return <Ri.MdOutlinePaRiSecurePaymentLineyment className={className} />;
        case 'LiaCommentsDollarSolid':
            return <Lia.LiaCommentsDollarSolid className={className} />;
        case 'LiaComment':
            return <Lia.LiaComment className={className} />;
        case 'LiaComments':
            return <Lia.LiaComments className={className} />;
        case 'FiUsers':
            return <Fi.FiUsers className={className} />;
        case 'GrUserSettings':
            return <Gr.GrUserSettings className={className} />;
        case 'RiUserStarLine':
            return <Ri.RiUserStarLine className={className} />;
        case 'PiMoneyWavyThin':
            return <Pi.PiMoneyWavyThin className={className} />;
        case 'CiCircleList':
            return <Ci.CiCircleList className={className} />;
        case 'ImMakeGroup':
            return <Im.ImMakeGroup className={className} />;
        case 'MdOutlineCoffeeMaker':
            return <Md.MdOutlineCoffeeMaker className={className} />;
        case 'LuFolderSync':
            return <Lu.LuFolderSync className={className} />;
        case 'BsBackpack':
            return <Bs.BsBackpack className={className} />;
        case 'BsBoundingBox':
            return <Bs.BsBoundingBox className={className} />;
        case 'AiOutlineDashboard':
            return <Ai.AiOutlineDashboard className={className} />;
        case 'IoColorPaletteOutline':
            return <Io5.IoColorPaletteOutline className={className} />;
        case 'RiFontColor':
            return <Ri.RiFontColor className={className} />;
        case 'AiOutlineUserSwitch':
            return <Ai.AiOutlineUserSwitch className={className} />;
        case 'GrDocumentTest':
            return <Gr.GrDocumentTest className={className} />;
        case 'GrDocumentCloud':
            return <Gr.GrDocumentCloud className={className} />;
        case 'LuUsers2':
            return <Lu.LuUsers2 className={className} />;
        case 'TbBrandAirtable':
            return <Tb.TbBrandAirtable className={className} />;
        case 'IoIosGitBranch':
            return <Io.IoIosGitBranch className={className} />;
        case 'TbFileReport':
            return <Tb.TbFileReport className={className} />;
        case 'FaBalanceScale':
            return <Fa.FaBalanceScale className={className} />;
        case 'FaUncharted':
            return <Fa.FaUncharted className={className} />;
        case 'PiChartLineDownLight':
            return <Pi.PiChartLineDownLight className={className} />;
        case 'IoAccessibilityOutline':
            return <Io5.IoAccessibilityOutline className={className} />;
        case 'RiUserSettingsLine':
            return <Ri.RiUserSettingsLine className={className} />;
        case 'CgChanel':
            return <Cg.CgChanel className={className} />;
        case 'MdOutlinePayment':
            return <Md.MdOutlinePayment className={className} />;
        case 'GoShieldLock':
            return <Go.GoShieldLock className={className} />;
        case 'CgDollar':
            return <Cg.CgDollar className={className} />;
        case 'AiOutlineDeliveredProcedure':
            return <Ai.AiOutlineDeliveredProcedure className={className} />;
        case 'GrDocumentConfig':
            return <Gr.GrDocumentConfig className={className} />;
        case 'GrDocumentImage':
            return <Gr.GrDocumentImage className={className} />;
        case 'TbUsersGroup':
            return <Tb.TbUsersGroup className={className} />;
        case 'TiGroupOutline':
            return <Ti.TiGroupOutline className={className} />;
        case 'GiLevelEndFlag':
            return <Gi.GiLevelEndFlag className={className} />;
        case 'HiOutlineReceiptTax':
            return <Hi.HiOutlineReceiptTax className={className} />;
        case 'GrDocumentStore':
            return <Gr.GrDocumentStore className={className} />;
        case 'LuFileLock':
            return <Lu.LuFileLock className={className} />;
        case 'GrDocumentRtf':
            return <Gr.GrDocumentRtf className={className} />;
        case 'PiCity':
            return <Pi.PiCity className={className} />;
        case 'RiUserLocationLine':
            return <Ri.RiUserLocationLine className={className} />;
        case 'FiSettings':
            return <Fi.FiSettings className={className} />;
        case 'RiFundsLine':
            return <Ri.RiFundsLine className={className} />;
        case 'FaRegUserv':
            return <Fa.FaRegUser className={className} />;
        case 'FaRegObjectUngroup':
            return <Fa.FaRegObjectUngroup className={className} />;
        case 'BsFiletypeDoc':
            return <Bs.BsFiletypeDoc className={className} />;
        case 'HiOutlineDocumentReport':
            return <Hi.HiOutlineDocumentReport className={className} />;
        case 'MdOutlineAddchart':
            return <Md.MdOutlineAddchart className={className} />;
            case 'AiOutlinePieChart':
                return <Ai.AiOutlinePieChart className={className} />;
            

        default:
            return <Fa.FaRegFolder className={className} />;

    }
}

export default SidebarIcon;

