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
import * as _viewer from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import * as _designer from 'stimulsoft-reports-js/Scripts/stimulsoft.designer';
import * as _reports from 'stimulsoft-reports-js/Scripts/stimulsoft.reports';
import * as _dashboards from 'stimulsoft-reports-js/Scripts/stimulsoft.dashboards';
// import * as _maps from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.maps';
// import * as _editor from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
// import * as _engine from 'stimulsoft-reports-js/Scripts/stimulsoft.reports.engine';
// import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';


const Dashboard = () => {
  const PersianYears = [
    { label: '1402', value: 1402 },
    { label: '1403', value: 1403 },
    { label: '1404', value: 1404 },
  ]
  const [currentYear, setCurrentYear] = useState(1402)

  // const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
  // const report = new _viewer.Stimulsoft.Report.StiReport();

  // var Options = new  _reports.Stimulsoft.Designer.StiComponentsOptions();
    // Options.appearance.fullScreenMode = true;

        const dsDataSource = new _viewer.Stimulsoft.System.Data.DataSet("DsName");
    var designer = new _designer.Stimulsoft.Designer.StiDesigner(undefined, 'StiDesigner', false);
    var report = new _reports.Stimulsoft.Report.StiReport();
    // _editor.Stimulsoft.Base.Licenses.StiLicenseKey.apply()
     const key_new = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkgpgFGkUl79uxVs8X+uspx6K+tqdtOB5G1S6PFPRrlVNvMUiSiNYl724EZbrUAWwAYHlGLRbvxMviMExTh2l9xZJ2xc4K1z3ZVudRpQpuDdFq+fe0wKXSKlB6okl0hUd2ikQHfyzsAN8fJltqvGRa5LI8BFkA/f7tffwK6jzW5xYYhHxQpU3hy4fmKo/BSg6yKAoUq3yMZTG6tWeKnWcI6ftCDxEHd30EjMISNn1LCdLN0/4YmedTjM7x+0dMiI2Qif/yI+y8gmdbostOE8S2ZjrpKsgxVv2AAZPdzHEkzYSzx81RHDzZBhKRZc5mwWAmXsWBFRQol9PdSQ8BZYLqvJ4Jzrcrext+t1ZD7HE1RZPLPAqErO9eo+7Zn9Cvu5O73+b9dxhE2sRyAv9Tl1lV2WqMezWRsO55Q3LntawkPq0HvBkd9f8uVuq9zk7VKegetCDLb0wszBAs1mjWzN+ACVHiPVKIk94/QlCkj31dWCg8YTrT5btsKcLibxog7pv1+2e4yocZKWsposmcJbgG0"
    const key_Old = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHn0s4gy0Fr5YoUZ9V00Y0igCSFQzwEqYBh/N77k4f0fWXTHW5rqeBNLkaurJDenJ9o97TyqHs9HfvINK18Uwzsc/bG01Rq+x3H3Rf+g7AY92gvWmp7VA2Uxa30Q97f61siWz2dE5kdBVcCnSFzC6awE74JzDcJMj8OuxplqB1CYcpoPcOjKy1PiATlC3UsBaLEXsok1xxtRMQ283r282tkh8XQitsxtTczAJBxijuJNfziYhci2jResWXK51ygOOEbVAxmpflujkJ8oEVHkOA/CjX6bGx05pNZ6oSIu9H8deF94MyqIwcdeirCe60GbIQByQtLimfxbIZnO35X3fs/94av0ODfELqrQEpLrpU6FNeHttvlMc5UVrT4K+8lPbqR8Hq0PFWmFrbVIYSi7tAVFMMe2D1C59NWyLu3AkrD3No7YhLVh7LV0Tttr/8FrcZ8xirBPcMZCIGrRIesrHxOsZH2V8t/t0GXCnLLAWX+TNvdNXkB8cF2y9ZXf1enI064yE5dwMs2fQ0yOUG/xornE"
    var key = key_Old
    _reports.Stimulsoft.Base.StiLicense.key = key
    _viewer.Stimulsoft.Base.StiLicense.Key = key
    _designer.Stimulsoft.Base.StiLicense.Key = key
    // _editor.Stimulsoft.Base.StiLicense.Key = key
  useEffect(() => {



    dsDataSource.readJson({ id: 122 });
    report.dictionary.clear();
    report.regData("DataSource", 'MainData', dsDataSource);
    report.dictionary.synchronize();
    designer.report = report;
    designer.renderHtml("designer");

  }, []);

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


      <div id="designer"></div>

    </>
  )
}

export default Dashboard
