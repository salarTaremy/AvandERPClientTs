import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import * as styles from "@/styles";

const RoleMenuList = ({ id, name }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllMenu();
    }, []);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data.roleNavMenuList) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllMenu = async () => {
        await ApiCall(`${url.ROLE_GET_NAV_MENU_RELATED_TO_ROLE}/${id}`);
    };

    const cl = [
        {
            title: "نام منو",
            dataIndex: "name",
            key: "name",
            width: 100,
        },
    ]

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <br></br>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={`دسترسی منو نقش "${name}"`} type="inner" loading={loading}>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        {...defaultValues.TABLE_PROPS}
                        className="mt-5"
                        pagination={false}
                        columns={cl}
                        dataSource={dataSource || null}
                    />
                </Ant.Skeleton>
            </Ant.Card>
        </>
    )
}

export default RoleMenuList
