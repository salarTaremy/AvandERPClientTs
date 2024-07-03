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
// import * as _viewer from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
// import * as _designer from 'stimulsoft-reports-js/Scripts/stimulsoft.designer';
// import * as _reports from 'stimulsoft-reports-js/Scripts/stimulsoft.reports';
// import * as _dashboards from 'stimulsoft-reports-js/Scripts/stimulsoft.dashboards';
// import * as _maps from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.maps';
// import * as _editor from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
// import * as _engine from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.engine';
// import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';


const Dashboard = () => {

    const Stimulsoft = window.Stimulsoft || {};
    var data = {}
    var JsonRep = {}


    var Options = new Stimulsoft.Designer.StiDesignerOptions();
    Options.appearance.fullScreenMode = true;
    Options.toolbar.fontFamily = "IRANSansWeb"
    Options.fontFamily = "IRANSansWeb"
   

    useEffect(() => {
        const dsDataSource = new Stimulsoft.System.Data.DataSet("DsName");
        var designer = new Stimulsoft.Designer.StiDesigner(Options, 'StiDesigner', false);
        var report = new Stimulsoft.Report.StiReport();
        //report.reportName = "MyNewReport";
        //report.loadFile("/reports/crossTabTest2.mrt");
        // var JsonRep= localStorage.getItem("rep")
        report.load(JsonRep);
        dsDataSource.readJson(data);
        report.dictionary.clear();
        report.regData("DataSource", 'MainData', dsDataSource);
        report.dictionary.synchronize();
        designer.report = report;
        designer.renderHtml("designer");

    }, []);


    return (
        <>
            <style>{".ltr{direction: ltr;}"}</style>
            <div className="page-content">
                <div className="ltr"
                    id="designer"></div>
            </div>
        </>
    )
}

export default Dashboard
