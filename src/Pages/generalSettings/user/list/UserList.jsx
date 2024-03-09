import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from 'react'
import columns from '../list/columns'
import * as defaultValues from '@/defaultValues'
import * as styles from '@/styles'
import * as url from '@/api/url'
import ButtonList from '@/components/common/ButtonList'
import useRequestManager from '@/hooks/useRequestManager'
import {
    useFetchWithHandler,
    useDelWithHandler,
} from '@/api'
import FormEditUser from '../edit/FormEditUser'
import FormAddNewUser from '../add/FormAddNewUser'
import * as uuid from 'uuid'
import FormResetPasswordUser from '../reset/FormResetPasswordUser'


const UserList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler()
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler()
    const [dataSource, setDataSource] = useState(null)
    useRequestManager({ error: error })
    useRequestManager({ error: delError, loading: delLoading, data: delSaving })
    const [modalState, setModalState] = useState(false)
    const [modalContent, setModalContent] = useState()


    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllUserList()
    }, [])

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null)
    }, [listData])

    useEffect(() => {
        delSaving?.isSuccess &&
            setDataSource([...dataSource?.filter((c) => c.id !== delSaving?.data?.id)])
    }, [delSaving])

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllUserList = async () => {
        await ApiCall(url.USER)
    }
    const onDelSuccess = async (id) => {
        await delApiCall(`${url.USER}/${id}`)
    }
    const onSuccessEdit = () => {
        setModalState(false)
        getAllUserList()
    }
    const onAdd = () => {
        setModalContent(<FormAddNewUser key={uuid.v1()} onSuccess={onSuccessAdd} />)
        setModalState(true)
    }
    const onSuccessAdd = () => {
        setModalState(false)
        getAllUserList()
    }

    const onReset = (val) => {
        setModalContent(
            <FormResetPasswordUser onSuccess={onSuccessReset} myKey={val.id} obj={val} id={val.id} />)
        setModalState(true)
    }
    const onSuccessReset = () => {
        setModalState(false)
        getAllUserList()
    }
    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditUser onSuccess={onSuccessEdit} myKey={val.id} obj={val} id={val.id} />,
        )
        setModalState(true)
    }
    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={() => {
                    onAdd()
                }}
                onRefresh={() => {
                    getAllUserList()
                }}
            />
        )
    }
    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        {...defaultValues.TABLE_PROPS}
                        title={title}
                        columns={columns(onDelSuccess, onEdit, onReset)}
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
            <Ant.Card title={'مدیریت کاربران'} type="inner" >
                <Ant.Modal
                    open={modalState}
                    handleCancel={() => setModalState(false)}
                    onCancel={() => {
                        setModalState(false)
                    }}
                    footer={null}
                    centered
                >
                    {modalContent}
                </Ant.Modal>
                <Ant.Card>
                    <Grid />
                </Ant.Card>
            </Ant.Card>
        </>
    )
}

export default UserList

