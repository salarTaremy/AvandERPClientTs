import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import * as url from '@/api/url'
import columns from '../list/columns'
import {
    useFetch,
    useFetchWithHandler
}
    from '@/api'
import * as defaultValues from "@/defaultValues";
import ButtonList from "@/components/common/ButtonList";



const UserRoleList = () => {
    const [form] = Ant.Form.useForm();
    const [userData, userLoading, userError] = useFetch(url.USER)
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedUser, setSelectedUser] = useState(null)
    const handleOnChange = (val, option) => {
        form.setFieldsValue({ unitId: undefined })
        setSelectedUser(option.id)
    }

      //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getRoleScopeWithRoles();
    }, []);

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    useEffect(() => {
        setSelectedUser(userData?.data.userId)
    }, [userData?.data.userId])

    useEffect(() => {
        selectedUser && ApiCall(`${url.ROLE_SCOPE_WITH_ROLES}?userName=${selectedUser}`)
    }, [selectedUser])
    //====================================================================
    //                        Functions
    //====================================================================
    const getRoleScopeWithRoles = async () => {
        await ApiCall(url.ROLE_SCOPE_WITH_ROLES);
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList

                onFilter={() => {

                }}
                onRefresh={() => {
                    getRoleScopeWithRoles()
                }}
            />
        );
    };
    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        {...defaultValues.TABLE_PROPS}
                        title={title}
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
        <Ant.Card title={'ارتباط کاربر با نقش'} type="inner" >
            <Ant.Form form={form} layout="vertical" onFinish={null}>
                <Ant.Row gutter={[16, 8]}>
                    <Ant.Col span={12} md={12} lg={12} xs={24}>
                        <Ant.Form.Item
                            name={"userName"}
                            label="نام کاربر"
                            rules={[{ required: true }]}
                        >
                            <Ant.Select
                                showSearch
                                onChange={handleOnChange}
                                placeholder={"انتخاب کنید..."}
                                disabled={userLoading || false}
                                loading={userLoading}
                                options={userData?.data}
                                fieldNames={{ label: "name", value: "userName" }}
                            />
                        </Ant.Form.Item>
                    </Ant.Col>
                </Ant.Row>
            </Ant.Form>
            <Ant.Card>
                <Grid />
            </Ant.Card>
        </Ant.Card>

    )
}

export default UserRoleList
UserRoleList.propTypes = {
    onFinish: PropTypes.func
}
