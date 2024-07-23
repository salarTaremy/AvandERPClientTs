import React, { useState, useEffect } from 'react'

// Import Highcharts
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import moment from 'moment'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import { useParams, useLocation } from 'react-router-dom';

// import * as _viewer from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
// import * as _designer from 'stimulsoft-reports-js/Scripts/stimulsoft.designer';
// import * as _reports from 'stimulsoft-reports-js/Scripts/stimulsoft.reports';
// import * as _dashboards from 'stimulsoft-reports-js/Scripts/stimulsoft.dashboards';
// import * as _maps from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.maps';
// import * as _editor from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
// import * as _engine from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.engine';
// import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';

/////////////////////////////////////////////////////////////////////////
const StiDesighner = () => {
    const location = useLocation();
    const Stimulsoft = window.Stimulsoft || {};
    var data = [{ id: 1, name: 'salar1' }, { id: 2, name: 'salar2' }]


    var Options = new Stimulsoft.Designer.StiDesignerOptions();
    Options.appearance.fullScreenMode = true;
    Options.toolbar.fontFamily = "IRANSansWeb"
    Options.fontFamily = "IRANSansWeb"

    useEffect(() => {
        console.log('pathname=>  ', location.pathname); // result: '/secondpage'
        console.log('search=>  ', location.search); // result: '?query=abc'
        console.log('location=> ', location); // result: 'some_value'
        console.log('state=> ', location.state); // result: 'some_value'


    }, [location]);

    useEffect(() => {
        const dsDataSource = new Stimulsoft.System.Data.DataSet("DsName");
        var designer = new Stimulsoft.Designer.StiDesigner(Options, 'StiDesigner', false);
        var report = new Stimulsoft.Report.StiReport();
        report.reportName = "MyNewReport";
        report.dictionary.clear();
        dsDataSource.readJson(data);
        report.regData("Data_Source", 'Main_Data', dsDataSource);
        report.dictionary.synchronize();

        designer.report = report;
        designer.renderHtml("designer");
        designer.onSaveReport = (args) => {
            console.log(args)
            var jsonReport = args.report.saveToJsonString();
            var obj = JSON.parse(jsonReport)
            console.log(obj)

        }

    }, []);


    return (
        <>
           
        </>
    )

}



////////////////////////////////////////////////////////////////////////
export const useStiDesigner = () => {
    useEffect(() => {
        alert('s')
    }, [])
    return (
        <StiDesighner/>
    )
}

/////////////////////////////////////////////////////////////////////////

const Desighner = () => {
    // const location = useLocation();
    // const Stimulsoft = window.Stimulsoft || {};
    // var data = [{id:1 , name:'salar1'},{id:2 , name:'salar2'}]


    // var Options = new Stimulsoft.Designer.StiDesignerOptions();
    // Options.appearance.fullScreenMode = true;
    // Options.toolbar.fontFamily = "IRANSansWeb"
    // Options.fontFamily = "IRANSansWeb"

    // useEffect(() => {
    //     console.log('pathname=>  ' , location.pathname); // result: '/secondpage'
    //     console.log('search=>  ' , location.search); // result: '?query=abc'
    //     console.log('location=> ' , location); // result: 'some_value'
    //     console.log('state=> ' , location.state); // result: 'some_value'


    // }, [location]);

    // useEffect(() => {
    //     const dsDataSource = new Stimulsoft.System.Data.DataSet("DsName");
    //     var designer = new Stimulsoft.Designer.StiDesigner(Options, 'StiDesigner', false);
    //     var report = new Stimulsoft.Report.StiReport();
    //     report.reportName = "MyNewReport";
    //     report.dictionary.clear();
    //     dsDataSource.readJson(data);
    //     report.regData("Data_Source", 'Main_Data', dsDataSource);
    //     report.dictionary.synchronize();

    //     designer.report = report;
    //     designer.renderHtml("designer");
    //     designer.onSaveReport = (args) => { 
    //         console.log(args)
    //         var jsonReport = args.report.saveToJsonString();
    //         var obj = JSON.parse(jsonReport)
    //         console.log(obj)

    //     }

    // }, []);


    // return (
    //     <>
    //         <div className="page-content">
    //             <div style={{ direction: "ltr" }}
    //                 id="designer"></div>
    //         </div>
    //     </>
    // )



    useStiDesigner()
    const onClick = () => {
        alert('onClick ... ')
    }
    return (
        <>
            <Ant.Button onClick={onClick}>
                {'Ok'}
            </Ant.Button>
        </>
    )
}

export default Desighner


