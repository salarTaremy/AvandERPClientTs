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
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import FilterPanel from './FilterPanel'
import qs from "qs";

const UserRoleList = () => {
    const [form] = Ant.Form.useForm();
    const [userData, userLoading, userError] = useFetch(url.USER)
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedUser, setSelectedUser] = useState(null)
    const handleOnChange = (val, option) => {
        form.setFieldsValue({ userId: undefined })
        setSelectedUser(option.id)
    }
    const [filterObject, setFilterObject] = useState(null)
    const [filterCount, setFilterCount] = useState(0)
    const [openFilter, setOpenFilter] = useState(false)

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject &&
            setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
        !filterObject && setFilterCount(0)
        getRoleScopeWithRoles()
    }, [filterObject])

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    // useEffect(() => {
    //     setSelectedUser(listData?.data.userId)
    // }, [listData?.data.userId])

    useEffect(() => {
        ApiCall(`${url.ROLE_SCOPE_WITH_ROLES}`)
    }, [])
    useEffect(() => {
        console.log('userNameeeeeeeeeeee', selectedUser)
        selectedUser && ApiCall(`${url.ROLE_SCOPE_WITH_ROLES}?userId=${selectedUser}`)
    }, [selectedUser])
    //====================================================================
    //                        Functions
    //====================================================================
    const getRoleScopeWithRoles = async () => {
        console.log('filterObject', filterObject)
        const userId = selectedUser
        const req = {
            roleScopePersianTitle: filterObject?.roleScopePersianTitle,
            rolePersianTitle: filterObject?.rolePersianTitle,
            UserId: userId,
        }
        const queryString = qs.stringify(req);
        console.log('userId', userId)
        await ApiCall(`${url.ROLE_SCOPE_WITH_ROLES}?${queryString}`)
    }

    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject)
        setOpenFilter(false)
    }

    const onRemoveFilter = () => {
        setFilterObject(null)
        setOpenFilter(false)
    }

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                filterCount={filterCount}
                onFilter={() => {
                    setOpenFilter(true)
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
            <Ant.Card loading={loading}>
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
                                    fieldNames={{ label: "userName", value: "id" }}
                                />
                            </Ant.Form.Item>
                        </Ant.Col>
                    </Ant.Row>
                </Ant.Form>
                <FilterDrawer
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    onRemoveFilter={onRemoveFilter}
                >
                    <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
                </FilterDrawer>
                <FilterBedge filterCount={filterCount}>
                    <Grid />
                </FilterBedge>
            </Ant.Card>
        </Ant.Card>

    )
}

export default UserRoleList
UserRoleList.propTypes = {
    onFinish: PropTypes.func
}
