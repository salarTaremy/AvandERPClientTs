import React, { useState, useEffect } from 'react'

// Import Highcharts
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import moment from 'moment'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import GanttA from './GanttA'
import GanttB from './GanttB'
import  {validateNationalCode} from '@/Tools'

const Dashboard = () => {
  const PersianYears = [
    { label: '1402', value: 1402 },
    { label: '1403', value: 1403 },
    { label: '1404', value: 1404 },
  ]
  const [currentYear, setCurrentYear] = useState(1402)

  return (
    <>
      {/* <Ant.Segmented
        options={PersianYears}
        block
        onChange={(val) => {
          setCurrentYear(val)
        }}
      /> */}
      {/* {currentYear === 1402 && <GanttA />} */}
      {/* {currentYear === 1403 && <GanttB />} */}




    </>
  )
}

export default Dashboard
