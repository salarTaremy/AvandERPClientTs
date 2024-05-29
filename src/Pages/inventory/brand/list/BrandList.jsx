import React from 'react'
import { useEffect, useState } from 'react'
import * as styles from '@/styles'
import * as Ant from 'antd'
import * as url from '@/api/url'
import qs from 'qs'
import * as uuid from 'uuid'
import * as defaultValues from '@/defaultValues'
import columns from './columns'
import FormAddBrand from '../add/FormAddBrand'
import FormEditBrand from '../edit/FormEditBrand'
import FilterPanel from '../list/FilterPanel'
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import useRequestManager from '@/hooks/useRequestManager'
import { useFetchWithHandler, useDelWithHandler } from '@/api'
import ButtonList from '@/components/common/ButtonList'
import BrandDescription from '../description/BrandDescription'

const BrandList = () => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler()
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler()
  const [modalState, setModalState] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [filterCount, setFilterCount] = useState(0)
  const [modalContent, setModalContent] = useState()
  const [filterObject, setFilterObject] = useState()
  const [dataSource, setDataSource] = useState(null)
  useRequestManager({ error: error })
  useRequestManager({ error: delError, data: delSaving, loading: delLoading })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    getAllBrand()
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

  const getAllBrand = async () => {
    const queryString = qs.stringify(filterObject)
    await ApiCall(`${url.BRAND}?${queryString}`)
  }
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject)
    setOpenFilter(false)
  }
  const onDelete = async (id) => {
    await delApiCall(`${url.BRAND}/${id}`)
  }
  const onAdd = () => {
    setModalContent(<FormAddBrand key={uuid.v1()} onSuccess={onSuccessAdd} />)
    setModalState(true)
  }

  const onSuccessAdd = () => {
    setModalState(false)
    getAllBrand()
  }
  const onSuccessEdit = () => {
    setModalState(false)
    getAllBrand()
  }

  const onRemoveFilter = () => {
    setFilterObject(null)
    setOpenFilter(false)
  }
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditBrand onSuccess={onSuccessEdit} myKey={val.id} obj={val} id={val.id} />,
    )
    setModalState(true)
  }
  const onView = (id) => {
    setModalContent(<BrandDescription id={id} key={id} />)
    setModalState(true)
  }

  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={onAdd}
        onFilter={() => {
          setOpenFilter(true)
        }}
        onRefresh={() => {
          getAllBrand()
        }}
      />
    )
  }
  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelete, onEdit, onView)}
          dataSource={dataSource}
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
       {...defaultValues.MODAL_PROPS}
        open={modalState}
        centered
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

      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={loadingData} title={'برند'} type="inner">

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
export default BrandList
