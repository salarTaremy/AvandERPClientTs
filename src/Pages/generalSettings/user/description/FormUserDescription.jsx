import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

import ModalHeader from "@/components/common/ModalHeader";
import { PiUserCircleCheckFill } from "react-icons/pi";
//====================================================================
//                        Declaration
//====================================================================
const FormUserDescription = (props) => {
    const { id } = props;
    const [data, loading, error] = api.useFetch(`${url.USER}/${id}`);
    useRequestManager({ error: error });
    const borderedItems = [
        {
            key: "1",
            label: "شناسه",
            span: 2,
            children: data?.data?.id,
        },
        {
            key: "2",
            label: "نام کاربری",
            span: 2,
            children: data?.data?.userName,
        },
        {
            key: "3",
            label: "تاریخ ایجاد",
            span: 2,
            children: data?.data?.createDate,
        },
        {
            key: "4",
            label: "وضعیت کاربر",
            span: 2,
            //children: data?.data?.isActive
            children: (
                <Ant.Badge
                    status={
                        (loading && "default") ||
                        (data?.data?.isActive && "success") ||
                        (!data?.data?.isActive && "error")
                    }
                    text={
                        (loading && <Ant.Spin />) ||
                        (data?.data?.isActive && "فعال") ||
                        (!data?.data?.isActive && "غیر فعال")
                    }
                />
            ),
        },
    ];
    //====================================================================
    //                        useEffects
    //====================================================================

    //====================================================================
    //                        Functions
    //====================================================================

    //====================================================================
    //                        Child Components
    //====================================================================

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <Ant.Skeleton active loading={loading}>
            <ModalHeader title={"جزئیات کاربر"} icon={<PiUserCircleCheckFill />} />
            <Ant.Descriptions
                bordered
                // layout="vertical"
                size={"middle"}
                // extra={<Ant.Button>ok</Ant.Button>}
                items={borderedItems}
            />
        </Ant.Skeleton>
    );
};
export default FormUserDescription;
FormUserDescription.propTypes = {
    id: PropTypes.number,
};
