
import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
const FilterBedge = (props) => {
  const {filterCount} = props
    return (
      (filterCount && filterCount > 0 && (
        <Ant.Badge.Ribbon text={'فیلتر شده'} color="purple">
          {props.children}
        </Ant.Badge.Ribbon>
      )) || <>{props.children}</>
    )
  }
  FilterBedge.propTypes = {
    children: PropTypes.any,
    filterCount:PropTypes.number,
  }
  export default FilterBedge