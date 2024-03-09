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
import FormAddNewBranch from '../add/FormAddNewBranch'
import FormEditBranch from '../edit/FormEditBranch'
import * as uuid from 'uuid'

const BranchList = () => {
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
        getAllBranchList()
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
    const getAllBranchList = async () => {
        await ApiCall(url.BRANCH)
    }
    const onDelSuccess = async (id) => {
        await delApiCall(`${url.BRANCH}/${id}`)
    }
    const onAdd = () => {
        setModalContent(<FormAddNewBranch key={uuid.v1()} onSuccess={onSuccessAdd} />)
        setModalState(true)
    }
    const onSuccessAdd = () => {
        setModalState(false)
        getAllBranchList()
    }
    const onSuccessEdit = () => {
        setModalState(false)
        getAllBranchList()
    }
    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditBranch onSuccess={onSuccessEdit} myKey={val.id} obj={val} id={val.id} />,
        )
        setModalState(true)
    }
    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={onAdd}
                onRefresh={() => {
                    getAllBranchList()
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
                        columns={columns(onDelSuccess, onEdit)}
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
            <Ant.Card title={'لیست شعب'} type="inner" loading={loading}>
                <Ant.Card >
                    <Grid />
                </Ant.Card>
            </Ant.Card>
        </>
    )
}

export default BranchList




