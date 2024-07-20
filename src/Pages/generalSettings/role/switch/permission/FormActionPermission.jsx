import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import * as url from '@/api/url'
import {
    useFetchWithHandler,
    usePutWithHandler
}
    from '@/api'
import * as defaultValues from "@/defaultValues";
import qs from "qs"
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";

const FormActionPermission = ({ roleId, appControllerId, onSuccess, name, persianTitle }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [selectedUser, setSelectedUser] = useState(null)
    useRequestManager({ error: error})
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [idActionsList, setIdActionsList] = useState([]);


    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getRoleScopeWithRoles()
    }, [])

    useEffect(() => {
        getRoleScopeWithRoles()
    }, [selectedUser]);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.roleHasAccess) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    useEffect(() => {
        editData?.isSuccess && onSuccess()
    }, [editData])

    //====================================================================
    //                        Functions
    //====================================================================
    const getRoleScopeWithRoles = async () => {
        const req = {
            appControllerId: appControllerId,
            roleId: roleId,
        }
        const queryString = qs.stringify(req);
        await ApiCall(`${url.ACTIONS}?${queryString}`)
    }

    const updateActionId = (listId) => {
        setIdActionsList(listId);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        updateActionId(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onFinish = async () => {
        const data = {
            roleId: roleId,
            AppControllerId: appControllerId,
            entityIdList: idActionsList,
        };
        await editApiCall(url.UPDATE_ROLE_ACTION_ASSIGNMENT, data)
    }

    const columns = () => {
        return [
            {
                title: "نام عملیات",
                dataIndex: "actionName",
                key: "actionName",
                width: 100,
                className: "text-xs sm:text-sm",
            },
            {
                title: "عنوان",
                dataIndex: "persianTitle",
                key: "persianTitle",
                width: 100,
                className: "text-xs sm:text-sm",
            },

        ]
    }

    //====================================================================
    //                        Child Components
    //====================================================================
    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        rowSelection={{ ...rowSelection }}
                        {...defaultValues.TABLE_PROPS}
                        pagination={false}
                        columns={columns()}
                        dataSource={dataSource}
                    />
                </Ant.Skeleton>
            </>
        )
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={`ویرایش دسترسی عملیات نقش " ${name} " بخش " ${persianTitle} "`} />
            <Grid />
            <Ant.Button block
                className='mt-4'
                loading={editLoading}
                type="primary"
                onClick={onFinish}
            >
                {'تایید'}
            </Ant.Button>
        </>
    );
}

export default FormActionPermission
FormActionPermission.propTypes = {
    onFinish: PropTypes.func
}

