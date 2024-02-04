import React, { useState, useEffect } from 'react'

// Import Highcharts
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import moment from 'moment'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import { defaultOptions } from './dependencies'

const GanttB = () => {
  const [currentYear, setCurrentYear] = useState(1403)
  const [series, setSeries] = useState(null)
  const [options, setOptions] = useState(defaultOptions)
  const [chartData, chartLoading, chartError, chartApiCall] = useFetchWithHandler()


  // const day = 24 * 36e5
  // const today = Math.floor(Date.now() / day) * day
  // const startDay = 1690070400000 //1402-05-01
  //====================================================================
  //                        useEffects
  //====================================================================
  const fillChart = async () => {
    await chartApiCall(`${url.GANTT_CHART}?PersianYear=${currentYear}`)
  }
  useEffect(() => {
    fillChart()
  }, [currentYear])
  useEffect(() => {
    chartData?.data &&
      setSeries([
        {
          name: 'Offices',
          data: chartData?.data,
        },
      ])
  }, [chartData])
  useEffect(() => {
    setOptions({...defaultOptions,series:series})
  }, [series])

  //====================================================================
  //                        Variables
  //====================================================================

  return (
    <>
      <Ant.Card loading={chartLoading}>
      <HighchartsReact
            key={currentYear}
            highcharts={Highcharts}
            constructorType={'ganttChart'}
            options={options}
          />
      </Ant.Card>
    </>
  )
}

export default GanttB
