import React from 'react'
import { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import qs from 'qs'
import * as styles from '@/styles'
import columns from '../list/columns'
import * as defaultValues from '@/defaultValues'
import FilterPanel from '../list/FilterPanel'
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import ButtonList from '@/components/common/ButtonList'
import useRequestManager from '@/hooks/useRequestManager'
import {
  useFetchWithHandler,
  useDelWithHandler,
} from '@/api'
import DetailProductListDescription from '../description/DetailProductListDescription'
import { useNavigate, generatePath } from "react-router-dom"


//====================================================================
//                        Declaration
//====================================================================
const ProductList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler()
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler()
  const [dataSource, setDataSource] = useState(null)
  const [modalContent, setModalContent] = useState()
  const [modalState, setModalState] = useState(false)
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  const [openFilter, setOpenFilter] = useState(false)
  const [pagination, setPagination] = useState({current: 1, pageSize: 10});
  useRequestManager({ error: error })
  useRequestManager({ error: delError, data: delSaving, loading: delLoading })
  const navigateTo = useNavigate()

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {

    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    getAllProductList()
  }, [filterObject])

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
  const getAllProductList = async () => {
    const queryString = qs.stringify(filterObject)
    await ApiCall(`${url.PRODUCT}?${queryString}`)
  }
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject)
    setOpenFilter(false)
  }
  const onRemoveFilter = () => {
    setFilterObject(null)
    setOpenFilter(false)
  }
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.PRODUCT}/${id}`)
  }
  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  }
  //====================================================================
  //                        Events
  //====================================================================
  const onView = (id) => {
    setModalContent(<DetailProductListDescription id={id} key={id} />)
    setModalState(true)
  }
  const onEdit = (id) => {
    console.log(id, "sogol")
    id && navigateTo(`/inventory/product/edit/${id}`, { id })
  }
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onRefresh={() => {
          getAllProductList()
        }}
        onFilter={() => {
          setOpenFilter(true)
        }}
      />
    )
  }

  const Grid = () => {
    return (
      <>
        <Ant.Table
          loading={delLoading}
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelSuccess, onView, onEdit)}
          dataSource={dataSource}
          pagination={pagination}
          onChange={onTableChange}
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
        width={800}
        open={modalState}
        handleCancel={() => {
          setModalState(false)
        }}
        onCancel={() => {
          setModalState(false)
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={loading} title={'مدیریت کالا و خدمات'} type="inner" >
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
    </>
  )

}
export default ProductList
