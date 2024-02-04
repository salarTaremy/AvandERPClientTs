import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import moment from 'moment'

export const defaultOptions = {
    chart: {
      style: {
        fontFamily: 'inherit',
      },
      // scrollablePlotArea: {
      //   minWidth: 1500,
      //   scrollPositionX: 1
      // }
    },

    plotOptions: {
      series: {
        borderRadius: '50%',
        groupPadding: 0,
        dataLabels: [
          {
            enabled: true,
            align: 'left',
            format: '{point.name}',
            padding: 10,
            style: {
              fontWeight: 'normal',
              textOutline: 'none',
            },
          },
          {
            enabled: true,
            align: 'right',
            format: '{#if point.completed}{(multiply point.completed.amount 100):.0f}%{/if}',
            padding: 10,
            style: {
              fontWeight: 'normal',
              textOutline: 'none',
              opacity: 0.6,
            },
          },
        ],
      },
    },

    //series: series,
    title: {
      text: 'Avand ERP Project Management(Gantt Chart)',
    },

    xAxis: [
      {
        type: 'datetime',
        //  categories: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
        //  categories:[],
        labels: {
          rotation: 90,
          formatter: function () {
            var CustomDate = moment.unix(this.value / 1000).format('YYYY/MM/DD')
            const date = new Date(CustomDate) // startDay's date
            const persian = new Intl.DateTimeFormat('fa-u-ca-persian', {
              dateStyle: 'full',
            }).format(date)
            const persian_la = new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn', {
              dateStyle: 'full',
            }).format(date)
            const fa_ir = new Intl.DateTimeFormat('fa-IR').format(date)
            const fa_ir_la = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn').format(date)
            let text = fa_ir_la.substring(4, 7)
            switch (fa_ir_la.substring(3, 7)) {
              case '2/1/':
                text = 'فروردین'
                break
              case '2/2/':
                text = 'اردیبهشت'
                break
              case '2/3/':
                text = 'خرداد'
                break
              case '2/4/':
                text = 'تیر'
                break
              case '2/5/':
                text = 'مرداد'
                break
              case '2/6/':
                text = 'شهریور'
                break
              case '2/7/':
                text = 'مهر'
                break
              case '2/8/':
                text = 'آبان'
                break
              case '2/9/':
                text = 'آذر'
                break
              case '2/10':
                text = 'دی'
                break
              case '2/11':
                text = 'بهمن'
                break
              case '2/12':
                text = 'اسفند'
                break
              case '3/1/':
                text = 'فروردین'
                break
              case '3/2/':
                text = 'اردیبهشت'
                break
              case '3/3/':
                text = 'خرداد'
                break
              case '3/4/':
                text = 'تیر'
                break
              case '3/5/':
                text = 'مرداد'
                break
              case '3/6/':
                text = 'شهریور'
                break
              case '3/7/':
                text = 'مهر'
                break
              case '3/8/':
                text = 'آبان'
                break
              case '3/9/':
                text = 'آذر'
                break
              case '3/10':
                text = 'دی'
                break
              case '3/11':
                text = 'بهمن'
                break
              case '3/12':
                text = 'اسفند'
                break

              default:
                text = '?'
            }

            return text
          },
        },
        grid: {
          borderWidth: 0,
        },
        gridLineWidth: 1,
        currentDateIndicator: {
          color: '#2caffe',
          dashStyle: 'ShortDot',
          width: 2,
          label: {
            format: '',
          },
        },
      },
      // {
      //   type: 'datetime',
      //   // categories: [],
      //   labels: {
      //     //rotation: 90,
      //     formatter: function () {
      //       var CustomDate = moment.unix(this.value / 1000).format('YYYY/MM/DD')
      //       const date = new Date(CustomDate) // startDay's date
      //       const persian = new Intl.DateTimeFormat('fa-u-ca-persian', {
      //         dateStyle: 'full',
      //       }).format(date)
      //       const persian_la = new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn', {
      //         dateStyle: 'full',
      //       }).format(date)
      //       const fa_ir = new Intl.DateTimeFormat('fa-IR').format(date)
      //       const fa_ir_la = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn').format(date)
      //       return fa_ir_la.substring(0, 4)
      //     },
      //   },
      //   grid: {
      //     borderWidth: 0,
      //   },
      //   gridLineWidth: 1,
      //   currentDateIndicator: {
      //     color: '#2caffe',
      //     dashStyle: 'ShortDot',
      //     width: 2,
      //     label: {
      //       format: '',
      //     },
      //   },
      // },
    ],

    yAxis: {
      grid: {
        borderWidth: 0,
      },
      gridLineWidth: 0,
      labels: {
        symbol: {
          width: 8,
          height: 6,
          x: -4,
          y: -2,
        },
      },
      staticScale: 30,
    },
    accessibility: {
      keyboardNavigation: {
        seriesNavigation: {
          mode: 'serialize',
        },
      },
      point: {
        descriptionFormatter: function (point) {
          const completedValue = point.completed ? point.completed.amount || point.completed : null,
            completed = completedValue
              ? ' Task ' + Math.round(completedValue * 1000) / 10 + '% completed.'
              : '',
            dependency = point.dependency && point.series.chart.get(point.dependency).name,
            dependsOn = dependency ? ' Depends on ' + dependency + '.' : ''

          return Highcharts.format(
            point.milestone
              ? '{point.yCategory}. Milestone at {point.x:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}'
              : '{point.yCategory}.{completed} Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}',
            { point, completed, dependsOn },
          )
        },
      },
    },
    lang: {
      accessibility: {
        axis: {
          xAxisDescriptionPlural:
            'The chart has a two-part X axis showing time in both week numbers and days.',
        },
      },
    },
  }

