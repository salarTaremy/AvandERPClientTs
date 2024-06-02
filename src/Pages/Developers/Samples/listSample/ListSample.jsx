import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import * as styles from '@/styles'
import * as defaultValues from '@/defaultValues'
import useRequestManager from '@/hooks/useRequestManager'
import { columns } from './columns'
import { PiControlDuotone } from 'react-icons/pi'
import ButtonList from '@/components/common/ButtonList'
import FilterPanel from './FilterPanel'
import FilterBedge from '@/components/common/FilterBedge'
import FilterDrawer from '@/components/common/FilterDrawer'
//====================================================================
//                        Declaration
//====================================================================
const ListSample = (props) => {
  const { id } = props
  const pageTitle = 'نمونه نمایش لیست(جدول)'
  const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler()
  const [openFilter, setOpenFilter] = useState(false)
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  useRequestManager({ error: listError })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    fillGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObject])

  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
    await listApiCall(url.ACCOUNT)
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
  const Title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={() => {
          alert('Add Click')
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
          {...defaultValues.TABLE_PROPS}
          columns={columns()}
          title={Title}
          dataSource={(listData?.isSuccess && listData?.data) || null}
        />
      </>
    )
  }

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={listLoading} title={pageTitle} type="inner">
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
      <Ant.Space direction='vertical' >

        {/* <Ant.Divider  orientation='left'>{'صفحه تست'}</Ant.Divider> */}
        {'صفحه تست'}
        <Title />


        <Ant.Card style={{ overflow: 'auto' }} >
          <FilterDrawer
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onRemoveFilter={onRemoveFilter}
          >
            <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
          </FilterDrawer>
          <FilterBedge filterCount={filterCount}>
            {/* <Grid /> */}
            <Ant.Table
              {...defaultValues.TABLE_PROPS}
              columns={columns()}

              dataSource={(listData?.isSuccess && listData?.data) || null}
            />
          </FilterBedge>
        </Ant.Card>

        <Ant.Card>
          ddddd
        </Ant.Card>
      </Ant.Space>
    </>


  )
}

export default ListSample
ListSample.propTypes = {
  id: PropTypes.any,
  children: PropTypes.any,
}
