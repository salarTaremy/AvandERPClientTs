import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as defaultValues from '@/defaultValues'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as uuid from 'uuid'
import { columns } from './columns'
import ButtonList from '@/components/common/ButtonList'
import FilterPanel from './FilterPanel'
import FilterBedge from '@/components/common/FilterBedge'
import FilterDrawer from '@/components/common/FilterDrawer'
import AccountDocumentDetailView from './AccountDocumentDetailView'
import AccountDocumentDescription from '@/Pages/accounting/accountDocument/description/AccountDocumentDescription'
import { useNavigate, generatePath } from 'react-router-dom'
//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentList = () => {
  const navigate = useNavigate()
  const pageTitle = 'مدیریت اسناد حسابداری'
  const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler()
  const [delData, delLoading, delError, delApiCall] = api.useDelWithHandler()
  const [openFilter, setOpenFilter] = useState(false)
  const [dataSource, setDataSource] = useState(null)
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  const [modalContent, setModalContent] = useState()
  const [modalState, setModalState] = useState(false)
  const [pagination, setPpagination] = useState({
    current: 1,
    pageSize: 10,
  })
  useRequestManager({ error: listError })
  useRequestManager({ error: delError, data: delData, loading: delLoading })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setPpagination({ ...pagination, current: 1 })
    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    fillGrid()
  }, [filterObject])

  useEffect(() => {
    fillGrid()
  }, [pagination.current, pagination.pageSize])

  useEffect(() => {
    setDataSource(listData?.data)
    setPpagination({
      ...pagination,
      total: listData?.data[0]?.totalCount,
    })
  }, [listData])

  useEffect(() => {
    delData?.isSuccess && setDataSource([...dataSource?.filter((c) => c.id != delData?.data?.id)])
  }, [delData])

  //====================================================================
  //                        Functions
  //====================================================================
  const expandedRowRender = (record, index, indent, expanded) => {
    return <AccountDocumentDetailView key={record.id} id={record.id} />
  }
  const fillGrid = async () => {
    const queryString = qs.stringify({
      ...filterObject,
      page: pagination.current,
      result: pagination.pageSize,
    })
    await listApiCall(`${url.ACCOUNT_DOCUMENT}?${queryString}`)
  }

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject)
    setOpenFilter(false)
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setPpagination(pagination)
  }
  const onRemoveFilter = () => {
    setFilterObject(null)
    setOpenFilter(false)
  }
  const onAdd = () => {
    navigate('/accounting/accountDocument/new')
    // setModalContent(<FrmAddAccountDocument key={uuid.v1()} />)
    // setModalState(true)
  }
  const onDelete = async (id) => {
    await delApiCall(`${url.ACCOUNT_DOCUMENT}/${id}`)
  }
  const onEdit = (id) => {
    console.log(id, 'valval')
    //  listApiCallEdit(`${url.ACCOUNT_DOCUMENT}/${id}`)
    id && navigate(generatePath('/accounting/accountDocument/edit/:id', { id }))

    // setModalContent(<FrmEditAccountDocument id={id} key={id} />)
    // setModalState(true)
  }
  const onView = (id) => {
    setModalContent(<AccountDocumentDescription id={id} key={id} />)
    setModalState(true)
  }
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={onAdd}
        onRefresh={() => {
          fillGrid()
        }}
        onFilter={() => {
          setOpenFilter(true)
        }}
      />
    )
  }
//====================================================================
  const Grid = () => {
    return (
      <>
        <Ant.Table
          columns={columns(onDelete, onEdit, onView)}
          dataSource={dataSource}
          pagination={pagination}
          // loading={delLoading }
          onChange={handleTableChange}
          {...defaultValues.TABLE_PROPS}
          title={title}
          expandable={{
            expandedRowRender,
          }}
        />
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
        centered
        width={800}
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false)
        }}
        onOk={() => {
          setModalState(false)
        }}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card Card title={pageTitle} type="inner">
        <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={listLoading}>
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
    </>
  )
}
export default AccountDocumentList
