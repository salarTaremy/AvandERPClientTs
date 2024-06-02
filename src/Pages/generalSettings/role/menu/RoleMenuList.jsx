import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import qs from "qs";
import ModalHeader from "@/components/common/ModalHeader";

const RoleMenuList = ({ id, name, onSuccess }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [items, setItems] = useState(null);
    const [
        listRoleNavMenuAssignment,
        loadingRoleNavMenuAssignment,
        errorRoleNavMenuAssignment,
        apiCallRoleNavMenuAssignment,
    ] = usePutWithHandler();
    useRequestManager({
        error: errorRoleNavMenuAssignment,
        data: listRoleNavMenuAssignment,
        loading: loadingRoleNavMenuAssignment,
    });
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const checked = [];
    const bottom = 100

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllMenu();
    }, []);

    useEffect(() => {
        setItems((data?.isSuccess && data?.data[0]?.children) || null);
    }, [data?.data]);

    useEffect(() => {
        items?.forEach((item) => {
            if (item?.roleHasAccess) {
                checked.push(item.key);
            } else (item?.children?.forEach((c) => {
                if (c.roleHasAccess) {
                    checked.push(c.key)
                }
            }))
        });
        setCheckedKeys(checked);
    }, [items]);

    //====================================================================
    //                        Events
    //====================================================================
    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue) => {
        setSelectedKeys(selectedKeysValue);
    };

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllMenu = async () => {
        const queryString = qs.stringify({
            roleId: id,
        });
        await ApiCall(`${url.NAV_MENU_TREE}?${queryString}`);
    };

    const onFinish = async () => {
        const req = {
            roleId: id,
            entityIdList: checkedKeys
        };
        await apiCallRoleNavMenuAssignment(url.UPDATE_ROLE_NAV_MENU, req);
        onSuccess()
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={`دسترسی منو نقش " ${name} "`} />
            <Ant.Skeleton loading={loading}>
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
            </Ant.Skeleton>
            <Ant.Affix offsetBottom={bottom} style={{ position: 'absolute', bottom: 0, left: 30 }}>
                <Ant.Button
                    block
                    style={{ width: 150 }}
                    type="primary"
                    onClick={onFinish}
                >
                    {'ذخیره'}
                </Ant.Button>
            </Ant.Affix>
        </>
    )
}

export default RoleMenuList
