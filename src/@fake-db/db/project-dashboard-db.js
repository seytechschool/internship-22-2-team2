import generateDayWiseTimeSeries from '@fake-db/utils';
import mock from '../mock';

const projectDashboardAppDB = {
  widgets: [
    {
      id: 'widget1',
      ranges: {
        Active: 'Active',
        Inactive: 'Inactive',
        InShop: 'In Shop'
      },
      currentRange: 'Active',
      data: {
        name: 'Vehicle Status',
        count: {
          Active: 3,
          Inactive: 1,
          InShop: 1
        }
        // extra: {
        //   name: 'Completed',
        //   count: {
        //     Active: 6,
        //     Inactive: 7,
        //     InShop: '-'
        //   }
        // }
      },
      detail: 'You can show some detailed information about this widget in here.'
    },
    {
      id: 'widget2',
      ranges: {
        Assigned: 'Assigned',
        Unassigned: 'Unassigned'
      },
      currentRange: 'Assigned',
      data: {
        name: 'Vehicle Assignments',
        count: {
          Assigned: 4,
          Unassigned: 2
        }
        // extra: {
        //   name: 'Completed',
        //   count: {
        //     Assigned: 6,
        //     Unassigned: 7
        //   }
        // }
      },
      detail: 'You can show some detailed information about this widget in here.'
    },
    {
      id: 'widget3',
      title: 'Issues',
      data: {
        name: 'Open',
        count: 5,
        extra: {
          name: 'Overdue',
          count: 1
        }
      },
      detail: 'You can show some detailed information about this widget in here.'
    },
    {
      id: 'widget4',
      ranges: {
       August: 'August',
        // VehicleRenewal: 'Vehicle Renewal'
      },
      currentRange: 'August',
      data: {
        name: 'Vehicles Due',
        count: {
          Service: 3,
          VehicleRenewal: 2
        },
        extra: {
          name: 'Overdue',
          count: {
            Service: 3,
            VehicleRenewal: 2
          }
        }
      },
      detail: 'You can show some detailed information about this widget in here.'
    },
    {
      id: 'widget5',
      title: 'Costs 2022',
      ranges: {
        Fuel: 'Fuel',
        Service: 'Service',
        Total: 'Total'
      },
      mainChart: {
        Fuel: {
          series: [
            {
              name: 'Fuel',
              data: [1100, 1000, 800, 1100, 800, 1000, 170]
            }
          ]
        },
        options: {
          theme: {
            mode: 'light',
            monochrome: {
              enabled: true,
              color: '#AD343E',
              shadeTo: 'light',
              sgadeIntensity: 0.65
            }
          }
        },
        Service: {
          labels: {
            formatter: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif'
            }
          },
          series: [
            {
              name: 'Service',
              data: [3700, 200, 3900, 2700, 800, 400, 4000]
            }
          ]
        },
        Total: {
          labels: {
            formatter: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' ],
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif'
            }
          },
          series: [
            {
              name: 'Total',
              data: [4800, 1200, 4600, 3800, 1600, 1400, 4170]
            }
          ]
        },
        options: {
          chart: {
            height: '100%',
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '90%',
              horizontal: false
            }
          },
          xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            labels: {
              style: {
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            followCursor: true,
            theme: 'dark',
            fixed: {
              enabled: false,
              position: 'topLeft',
              offsetX: 0,
              offsetY: 0
            }
          },
          legend: {
            show: false
          },
          theme: {
            mode: 'light',
            // palette: 'palette2',
            monochrome: {
              enabled: true,
              color: '#006BA6',
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
          dataLabels: {
            enabled: true
          }
        }
      }
    },
    {
      id: 'widget6',
      title: 'Task Distribution',
      ranges: {
        TW: 'This Week',
        LW: 'Last Week',
        '2W': '2 Weeks Ago'
      },
      currentRange: 'TW',
      mainChart: {
        series: {
          TW: [15, 20, 38, 27],
          LW: [19, 16, 42, 23],
          '2W': [18, 17, 40, 25]
        },
        options: {
          series: [76, 67, 61],
          chart: {
            height: '100%',
            type: 'polarArea'
          },
          stroke: {
            width: 1,
            colors: undefined
          },
          fill: {
            type: 'solid',
            opacity: 0.7
          },
          legend: {
            position: 'bottom'
          },
          theme: {
            monochrome: {
              enabled: true,
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
          labels: ['Frontend', 'Backend', 'API', 'Issues']
        }
      },
      footerLeft: {
        title: 'Tasks Added',
        count: {
          '2W': 487,
          LW: 526,
          TW: 594
        }
      },
      footerRight: {
        title: 'Tasks Completed',
        count: {
          '2W': 193,
          LW: 260,
          TW: 287
        }
      }
    },
    {
      id: 'widget7',
      title: 'Schedule',
      currentRange: 'T',
      ranges: {
        T: 'August',
        TM: 'September'
      },
      schedule: {
        T: [
          {
            id: 1,
				  title: 'Semi Annual Report Meeting',
            time: 'August 1, 2022 11:00AM(PST)'
          },
          {
            id: 2,
            title: 'August Birthdays',
				 time: 'August 5, 2022 4:00PM(PST)'
          },
          {
            id: 3,
            title: 'Budget Re-evaluation',
				 time: 'August 9, 2022 10:00AM(PST)'
          },
          {
            id: 4,
				 title: 'Greet & Meet New hirees',
				 time: 'August 12, 2022 4:00PM(PST)'
          },
          {
            id: 5,
				 title: 'Web App Accessibility Check',
				 time: 'August 15, 2022 9:30AM(PST)'
          },
          {
            id: 6,
				 title: "Re-evaluated Budget Submission",
				 time: 'August 24, 2022 2:00PM(PST)'
          },
          {
            id: 7,
				 title: "Seasonal Safety Requirements",
				 time: 'August 29, 2022 10:00AM(PST)'
          }
        ],
        TM: [
          {
            id: 1,
            title: 'Labor Day (Enjoy Day off!)',
				  time: 'September 5, 2022 All day'
          },
          {
            id: 2,
				 title: 'Vehicle Checkup Requirements',
				 time: 'September 6, 2022 1:00PM(PST)'
          },
          {
            id: 3,
				 title: 'September Birthdays',
				 time: 'September 9, 2022 4:00PM(PST)'
          },
          {
            id: 4,
				 title: 'Weather Widget Expansion',
				 time: 'September 12, 2022 11:00AM(PST)'
          },
          {
            id: 5,
				 title: 'Meeting with Beta Testers',
				 time: 'September 22, 2022 11:00AM(PST)'
          },
          {
            id: 6,
            title: 'Marketing Meeting',
				 time: 'September 26, 2022 10:00AM(PST)'
          },
          {
            id: 7,
            title: "Sales Team Meeting",
				 time: 'September 29, 2022 10:30AM(PST)'
          }
        ]
      }
    },
    {
      id: 'widget8',
      // title: 'Inspection Summary',
      title: 'Vehicle Status',
      mainChart: {
        series: [66.7, 33.3],
        options: {
          chart: {
            height: '100%',
            type: 'donut'
          },
          name: {
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          stroke: {
            width: 1,
            colors: undefined
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'bottom',
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          theme: {
            palette: 'palette3',
            monochrome: {
              enabled: false,
              shadeTo: 'light',
              shadeIntensity: 0.65
            }
          },
          // labels: ['with 0 inspections', 'With > 0 inspections']
          labels: ['Active', 'Inactive', 'In Shop']
        }
      }
    },
    {
      id: 'widget9',
      title: 'Budget',
      ranges: {
        TW: 'This Week',
        LW: 'Last Week',
        '2W': '2 Weeks Ago'
      },
      currentRange: 'TW',
      weeklySpent: {
        title: 'WEEKLY SPENT',
        count: {
          '2W': '2,682.85',
          LW: '1,445.34',
          TW: '3,630.15'
        },
        chart: {
          '2W': {
            series: [
              {
                name: 'Created',
                data: [2, 6, 5, 4, 5, 3, 6]
              }
            ]
          },
          LW: {
            series: [
              {
                name: 'Created',
                data: [4, 6, 2, 2, 1, 3, 4]
              }
            ]
          },
          TW: {
            series: [
              {
                name: 'Created',
                data: [2, 6, 5, 4, 5, 3, 6]
              }
            ]
          },
          options: {
            chart: {
              type: 'area',
              height: '100%',
              sparkline: {
                enabled: true
              }
            },
            stroke: { width: 2 },
            grid: {
              padding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0
              }
            },
            fill: {
              type: 'solid',
              opacity: 0.7
            },
            tooltip: {
              followCursor: true,
              theme: 'dark',
              fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0
              }
            },
            xaxis: {
              categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
          }
        }
      },
      totalSpent: {
        title: 'TOTAL SPENT',
        count: {
          '2W': '29,682.85',
          LW: '31,128.19',
          TW: '34,758.34'
        },
        chart: {
          '2W': {
            series: [
              {
                name: 'Created',
                data: [3, 2, 2, 4, 7, 7, 4]
              }
            ]
          },
          LW: {
            series: [
              {
                name: 'Created',
                data: [5, 7, 8, 8, 6, 4, 1]
              }
            ]
          },
          TW: {
            series: [
              {
                name: 'Created',
                data: [6, 4, 7, 5, 5, 4, 7]
              }
            ]
          },
          options: {
            chart: {
              type: 'area',
              height: '100%',
              sparkline: {
                enabled: true
              }
            },
            stroke: { width: 2 },
            grid: {
              padding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0
              }
            },
            fill: {
              type: 'solid',
              opacity: 0.7
            },
            tooltip: {
              followCursor: true,
              theme: 'dark',
              fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0
              }
            },
            xaxis: {
              categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
          }
        }
      },
      remaining: {
        title: 'REMAINING',
        count: {
          '2W': '94.317,15',
          LW: '92.871,81',
          TW: '89.241,66'
        },
        chart: {
          '2W': {
            series: [
              {
                name: 'Created',
                data: [1, 4, 5, 7, 8, 2, 4],
                fill: true,
                backgroundColor: '#42BFF7',
                pointRadius: 0,
                pointHitRadius: 20,
                borderWidth: 0
              }
            ]
          },
          LW: {
            series: [
              {
                name: 'Created',
                data: [3, 2, 1, 4, 8, 8, 4],
                fill: true,
                backgroundColor: '#42BFF7',
                pointRadius: 0,
                pointHitRadius: 20,
                borderWidth: 0
              }
            ]
          },
          TW: {
            series: [
              {
                name: 'Created',
                data: [2, 4, 8, 6, 2, 5, 1],
                fill: true,
                backgroundColor: '#42BFF7',
                pointRadius: 0,
                pointHitRadius: 20,
                borderWidth: 0
              }
            ]
          },
          options: {
            chart: {
              type: 'area',
              height: '100%',
              sparkline: {
                enabled: true
              }
            },
            stroke: { width: 2 },
            grid: {
              padding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0
              }
            },
            fill: {
              type: 'solid',
              opacity: 0.7
            },
            tooltip: {
              followCursor: true,
              theme: 'dark',
              fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0
              }
            },
            xaxis: {
              categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
          }
        }
      },
      totalBudget: {
        title: 'TOTAL BUDGET',
        count: '124.000,00'
      }
    },
    {
      id: 'widget10',
      title: 'Budget Details',
      table: {
        columns: [
          {
            id: 'budget_type',
            title: 'Budget Type'
          },
          {
            id: 'total_budget',
            title: 'Total Budget'
          },
          {
            id: 'spent_usd',
            title: 'Spent ($)'
          },
          {
            id: 'spent_perc',
            title: 'Spent (%)'
          },
          {
            id: 'remaining_usd',
            title: 'Remaining ($)'
          },
          {
            id: 'remaining_perc',
            title: 'Remaining (%)'
          }
        ],
        rows: [
          {
            id: 1,
            cells: [
              {
                id: 'budget_type',
                value: 'Wireframing',
                classes: 'bg-blue text-white',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$14,880.00',
                classes: 'font-semibold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$14,000.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%94.08',
                classes: 'text-green',
                icon: 'trending_up'
              },
              {
                id: 'remaining_usd',
                value: '$880.00',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%5.92',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 2,
            cells: [
              {
                id: 'budget_type',
                value: 'Design',
                classes: 'bg-green text-white',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$21,080.00',
                classes: 'font-semibold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$17,240.34',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%81.78',
                classes: 'text-green',
                icon: 'trending_up'
              },
              {
                id: 'remaining_usd',
                value: '$3,839.66',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%18.22',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 3,
            cells: [
              {
                id: 'budget_type',
                value: 'Coding',
                classes: 'bg-red text-white',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$34,720.00',
                classes: 'font-semibold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$3,518.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%10.13',
                classes: 'text-red',
                icon: 'trending_down'
              },
              {
                id: 'remaining_usd',
                value: '$31,202.00',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%89.87',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 4,
            cells: [
              {
                id: 'budget_type',
                value: 'Marketing',
                classes: 'bg-pink text-white',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$34,720.00',
                classes: 'font-semibold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$0.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%0.00',
                classes: 'text-blue',
                icon: 'trending_flat'
              },
              {
                id: 'remaining_usd',
                value: '$34,720.00',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%100.00',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 5,
            cells: [
              {
                id: 'budget_type',
                value: 'Extra',
                classes: 'bg-orange text-white',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$18,600.00',
                classes: 'font-semibold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$0.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%0.00',
                classes: 'text-blue',
                icon: 'trending_flat'
              },
              {
                id: 'remaining_usd',
                value: '$34,720.00',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%100.00',
                classes: '',
                icon: ''
              }
            ]
          }
        ]
      }
    },
    {
      id: 'widget11',
      title: 'Team Members',
      table: {
        columns: [
          {
            id: 'avatar',
            title: ''
          },
          {
            id: 'name',
            title: 'Name'
          },
          {
            id: 'position',
            title: 'Position'
          },
          {
            id: 'office',
            title: 'Office'
          },
          {
            id: 'email',
            title: 'Email'
          },
          {
            id: 'phone',
            title: 'Phone'
          }
        ],
        rows: [
          {
            id: 1,
            cells: [
              {
                id: 'avatar',
                value: 'https://media-exp1.licdn.com/dms/image/C4E03AQH17rpZBZ1V-g/profile-displayphoto-shrink_100_100/0/1647547777270?e=1665014400&v=beta&t=RtbBBQtbC0qWaQXHPWEwqmIcA1PRfgQDa-naoxZQKI8'
              },
              {
                id: 'name',
                value: 'Ilgiz Temirbekov'
              },
              {
                id: 'position',
                value: 'Team Leader'
              },
              {
                id: 'office',
                value: 'Montreal'
              },
              {
                id: 'email',
                value: 'temirbekov91@gmail.com'
              },
              {
                id: 'phone',
                value: '+1  148 096 544'
              }
            ]
          },
          {
            id: 2,
            cells: [
              {
                id: 'avatar',
                value: 'https://media-exp1.licdn.com/dms/image/C5603AQEiHrY6hEyqXA/profile-displayphoto-shrink_800_800/0/1627026666268?e=1665619200&v=beta&t=VilpbPPRr2WQ83se_lGgQAbOQ7S-T86oeJbYbO1MAis'
              },
              {
                id: 'name',
                value: 'Erzhan Aldamatov'
              },
              {
                id: 'position',
                value: 'Scrum Master'
              },
              {
                id: 'office',
                value: 'Sydney'
              },
              {
                id: 'email',
                value: 'aldamatov@gmail.com'
              },
              {
                id: 'phone',
                value: '+61 431 553 757'
              }
            ]
          },
          {
            id: 3,
            cells: [
              {
                id: 'avatar',
                value: 'https://ca.slack-edge.com/THH47V4TS-U0348SVP2Q0-0fc682f56f61-72'
              },
              {
                id: 'name',
                value: 'Asel Williams'
              },
              {
                id: 'position',
                value: 'Scrum Master'
              },
              {
                id: 'office',
                value: 'Dallas'
              },
              {
                id: 'email',
                value: 'aselwilliams22@gmail.com'
              },
              {
                id: 'phone',
                value: '+59 996 987 691'
              }
            ]
          },
          {
            id: 4,
            cells: [
              {
                id: 'avatar',
                value: ''
              },
              {
                id: 'name',
                value: 'Mars Eshnazarov'
              },
              {
                id: 'position',
                value: 'Frontend Developer'
              },
              {
                id: 'office',
                value: 'Pennsylvania'
              },
              {
                id: 'email',
                value: 'mars.eshnazarov@gmail.com'
              },
              {
                id: 'phone',
                value: '+12 159 625 671'
              }
            ]
          },
          {
            id: 5,
            cells: [
              {
                id: 'avatar',
                value: 'https://media-exp1.licdn.com/dms/image/C5603AQEzvSRSr90f6A/profile-displayphoto-shrink_100_100/0/1656564834502?e=1665014400&v=beta&t=tPVv09MVYkc8bmSAlNHhcZjD85KiFigoNM1kD8NXR8A'
              },
              {
                id: 'name',
                value: 'Rakhat Mamytova'
              },
              {
                id: 'position',
                value: 'Frontend Developer'
              },
              {
                id: 'office',
                value: 'Los Angeles'
              },
              {
                id: 'email',
                value: 'rakhat.mamyt@gmail.com'
              },
              {
                id: 'phone',
                value: '+16 318 301 278'
              }
            ]
          },
          {
            id: 6,
            cells: [
              {
                id: 'avatar',
                value: 'https://ca.slack-edge.com/THH47V4TS-U031QRAQSNL-e4b2faeb6d46-72'
              },
              {
                id: 'name',
                value: 'Tatiana Cherbaeva'
              },
              {
                id: 'position',
                value: 'UX/UI Designer'
              },
              {
                id: 'office',
                value: 'Los Angeles'
              },
              {
                id: 'email',
                value: 'tatianacherbaeva@gmail.com'
              },
              {
                id: 'phone',
                value: '+13 109 944 976'
              }
            ]
          },
          {
            id: 7,
            cells: [
              {
                id: 'avatar',
                value: ''
              },
              {
                id: 'name',
                value: 'Gyzylgul Garryyeva'
              },
              {
                id: 'position',
                value: 'Backend Developer'
              },
              {
                id: 'office',
                value: 'Vancouver'
              },
              {
                id: 'email',
                value: 'gyzyl89@gmail.com'
              },
              {
                id: 'phone',
                value: '+12 369 969 197'
              }
            ]
          },
          {
            id: 8,
            cells: [
              {
                id: 'avatar',
                value: 'https://lh3.googleusercontent.com/a-/AFdZucoHc56dppF2yQwh-HyiHVtRRBycsb0VgIufJZfD=s64-p-k-rw-no'
              },
              {
                id: 'name',
                value: 'Aimana Tazhibaeva'
              },
              {
                id: 'position',
                value: 'Backend Developer'
              },
              {
                id: 'office',
                value: 'Los Angeles'
              },
              {
                id: 'email',
                value: 'aimasha200300@gmail.com'
              },
              {
                id: 'phone',
                value: '+19 294 769 298'
              }
            ]
          },
          {
            id: 9,
            cells: [
              {
                id: 'avatar',
                value: 'https://media-exp1.licdn.com/dms/image/C4D03AQEgAEkY_okcGw/profile-displayphoto-shrink_200_200/0/1658292509405?e=1665014400&v=beta&t=TzEhpf96hb8sO5gEuB9lgXnu5hkIYxS8bYQtD1cNtfc'
              },
              {
                id: 'name',
                value: 'Bekzat Minbaev'
              },
              {
                id: 'position',
                value: 'DevOps'
              },
              {
                id: 'office',
                value: 'USA'
              },
              {
                id: 'email',
                value: 'bekatut@gmail.com'
              },
              {
                id: 'phone',
                value: '+4 254 594 134'
              }
            ]
          }
        ]
      }
    },
    {
      id: 'widget12',
      title: 'Trucks Count',
      mainChart: {
        series: [
          {
            name: 'Trucks',
            data: [5, 9, 14, 22, 31, 47, 75]
          }
        ],
        options: {
          chart: {
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          theme: {
            palette: 'palette7',
            monochrome: {
              enabled: false,
              shadeTo: 'dark',
              shadeIntensity: 0.65
            }
          },
          xaxis: {
            categories: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
          }
        }
      }
    },
    // {
    //   id: 'widget12',
    //   title: 'Latest Meter Readings',
    //   currentRange: 'TW',
    //   mainChart: {
    //     series: {
    //       TW: [
    //         {
    //           name: 'SAMPLE A',
    //           data: generateDayWiseTimeSeries(new Date('11 Feb 2020 GMT').getTime(), 10, {
    //             min: 100000,
    //             max: 600000
    //           })
    //         }
    //       ]
    //     },
    //     options: {
    //       chart: {
    //         width: '100%',
    //         height: '100%',
    //         // type: 'scatter',
    //         type: 'line',
    //         toolbar: {
    //           show: false
    //         }
    //       },
    //       stroke: {
    //         width: 1,
    //         colors: undefined
    //       },
    //       fill: {
    //         type: 'solid',
    //         opacity: 0.9
    //       },
    //       legend: {
    //         position: 'bottom'
    //       },
    //       theme: {
    //         monochrome: {
    //           enabled: true,
    //           shadeTo: 'dark',
    //           shadeIntensity: 0.65
    //         }
    //       },
    //       xaxis: {
    //         type: 'datetime',
    //         labels: {
    //           style: {
    //             fontSize: '16px',
    //             fontFamily: 'Helvetica, Arial, sans-serif'
    //           }
    //         }
    //       },
    //       yaxis: {
    //         tickAmount: 5,
    //         labels: {
    //           style: {
    //             fontSize: '16px',
    //             fontFamily: 'Helvetica, Arial, sans-serif'
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    {
      id: 'weatherWidget',
      locations: {
        NewYork: {
          name: 'New York',
          icon: 'rainy2',
          temp: {
            C: '22',
            F: '72'
          },
          windSpeed: {
            KMH: 12,
            MPH: 7.5
          },
          windDirection: 'NW',
          rainProbability: '98%',
          next5Days: [
            {
              name: 'Sunday',
              icon: 'rainy',
              temp: {
                C: '21',
                F: '70'
              }
            },
            {
              name: 'Monday',
              icon: 'cloudy',
              temp: {
                C: '19',
                F: '66'
              }
            },
            {
              name: 'Tuesday',
              icon: 'windy3',
              temp: {
                C: '24',
                F: '75'
              }
            },
            {
              name: 'Wednesday',
              icon: 'rainy',
              temp: {
                C: '21',
                F: '70'
              }
            },
            {
              name: 'Thursday',
              icon: 'rainy2',
              temp: {
                C: '24',
                F: '75'
              }
            }
          ]
        }
      },
      currentLocation: 'NewYork',
      tempUnit: 'C',
      speedUnit: 'KMH'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'ACME Corp. Backend App'
    },
    {
      id: 2,
      name: 'ACME Corp. Frontend App'
    },
    {
      id: 3,
      name: 'Creapond'
    },
    {
      id: 4,
      name: 'Withinpixels'
    }
  ]
};

mock.onGet('/api/project-dashboard-app/widgets').reply(config => {
  return [200, projectDashboardAppDB.widgets];
});

mock.onGet('/api/project-dashboard-app/projects').reply(config => {
  return [200, projectDashboardAppDB.projects];
});
