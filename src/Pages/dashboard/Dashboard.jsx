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
import { validateNationalCode } from '@/Tools'
import { useParams, useLocation } from 'react-router-dom';
import CoustomContent from '@/components/common/CoustomContent'

// import * as _viewer from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
// import * as _designer from 'stimulsoft-reports-js/Scripts/stimulsoft.designer';
// import * as _reports from 'stimulsoft-reports-js/Scripts/stimulsoft.reports';
// import * as _dashboards from 'stimulsoft-reports-js/Scripts/stimulsoft.dashboards';
// import * as _maps from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.maps';
// import * as _editor from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
// import * as _engine from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.engine';
// import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';



const Dashboard = () => {
    const [currentYear, setCurrentYear] = useState(1402)
    return <>
    <Ant.Button onClick={()=> setCurrentYear(currentYear== 1402  && 1403 || 1402)}>
        {`برو به سال  ${currentYear== 1402  && 1403 || 1402}`}
    </Ant.Button>
        <Ant.Row gutter={[16, 16]}>
            <Ant.Col span={24}>
            {currentYear== 1402 && <GanttA />}
            </Ant.Col>
            <Ant.Col span={24}>
            {currentYear== 1403 && <GanttB />}
            </Ant.Col>
        </Ant.Row>


    </>

}

export default Dashboard
