import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import * as url from '@/api/url'
import columns from '../list/columns'
import {
    useFetch,
    useFetchWithHandler,
    usePutWithHandler
}
    from '@/api'
import * as defaultValues from "@/defaultValues";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import FilterPanel from './FilterPanel'
import qs from "qs"
import useRequestManager from '@/hooks/useRequestManager'

const UserRoleList = () => {
    const [form] = Ant.Form.useForm();
    const [userData, userLoading, userError] = useFetch(url.USER)
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedUser, setSelectedUser] = useState(null)
    const [filterObject, setFilterObject] = useState(null)
    const [filterCount, setFilterCount] = useState(0)
    const [openFilter, setOpenFilter] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const roleIdList = []
    var oldRoleId = []
    useRequestManager({ error: editError, editLoading: editLoading, data: editData })

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
        getRoleScopeWithRoles()
    }, [selectedUser]);

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    useEffect(() => {
        editData?.isSuccess && onSuccessEdit()
    }, [editData])

    //====================================================================
    //                        Functions
    //====================================================================
    const getRoleScopeWithRoles = async () => {
        console.log('filterObject', filterObject)
        const userId = selectedUser
        console.log('userId', userId)
        const req = {
            roleScopePersianTitle: filterObject?.roleScopePersianTitle,
            rolePersianTitle: filterObject?.rolePersianTitle,
            UserId: userId,
        }
        const queryString = qs.stringify(req);
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

    const handleOnChange = async (val, option) => {
        console.log('userIddddd', option.id)
        setSelectedUser(option.id)
    }

    const onChange = (roleId) => {
        console.log('id', roleId)
        if (roleId) {
            roleIdList.push(roleId)
            console.log('roleIdList', roleIdList)
        }
        const temp = (dataSource.filter(listData => listData.userHasRole == true))
        console.log('temp', temp)
        temp?.map((item) => {
            if (item.userHasRole) {
                roleIdList.push(item.roleId)
                console.log('OLD-ROLE-ID', item.roleId)
            }
        })
    }

    const onFinish = async () => {
        oldRoleId = [...new Set(roleIdList)]
        const userHasRole = oldRoleId
        console.log('userHasRole', oldRoleId)
        const req = {
            userId: selectedUser,
            roleIdList: userHasRole
        }
        await editApiCall(url.ROLE_UPDATE_ROLE_USER_ASSIGNMENT, req)
    }

    const onSuccessEdit = () => {
        getRoleScopeWithRoles();
    };

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
                        columns={columns(onChange)}
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
                <Ant.Form form={form} layout="vertical" >
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
                        <Ant.Col span={12} md={12} lg={12} xs={24}>
                            <Ant.Form.Item>
                                <Ant.Button
                                    className='mt-8'
                                    loading={editLoading}
                                    type="primary"
                                    style={{ width: 150 }}
                                    onClick={onFinish}
                                >
                                    {'ثبت'}
                                </Ant.Button>
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
        </Ant.Card >

    )
}

export default UserRoleList
UserRoleList.propTypes = {
    onFinish: PropTypes.func
}
