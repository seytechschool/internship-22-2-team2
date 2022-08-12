import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import { memo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function Widget13() {
  const vehicleData = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.entities);
  const vehicles = Object.values(vehicleData).map(v => v.brand);
  console.log(vehicles, 'vehicles');

  const uniqueVehicles = vehicles.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
    return acc;
  }, {});

  const series = [
    {
      data: [
        {
          x: 'Audi',
          y: uniqueVehicles.AUDI
        },
        {
          x: 'BMW',
          y: uniqueVehicles.BMW
        },
        {
          x: 'Ferrari',
          y: uniqueVehicles.FERRARI
        },
        {
          x: 'Freigtliner',
          y: uniqueVehicles.FREIGHTLINER
        },
        {
          x: 'Honda',
          y: uniqueVehicles.HONDA
        },
        {
          x: 'Kia',
          y: uniqueVehicles.KIA
        },
        {
          x: 'Lexus',
          y: uniqueVehicles.LEXUS
        },
        {
          x: 'Mercedes',
          y: uniqueVehicles.MERCEDES
        },
        {
          x: 'Nissan',
          y: uniqueVehicles.NISSSAN
        },
        {
          x: 'Porshe',
          y: uniqueVehicles.PORSHE
        },
        {
          x: 'Toyota',
          y: uniqueVehicles.TOYOTA
        },
        {
          x: 'Volkswagen',
          y: uniqueVehicles.VOLKSWAGEN
        },
        {
          x: 'Volvo',
          y: uniqueVehicles.VOLVO
        },
        {
          x: 'Nissan',
          y: uniqueVehicles.NISSAN
        }
      ]
    }
  ];
  const options = {
    legend: {
      show: false
    },
    chart: {
      height: 250,
      type: 'treemap'
    },
    title: {
      text: 'Vehicle Model Treemap'
    },
    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#aacc44',
      '#EF6537',
      '#C0ADDB'
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    }
  };

  return (
    <Paper className="w-full rounded-20 shadow" style={{ fontStyle: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}>
      {/* <div className="flex items-center justify-between p-20 h-64 ">
        <Typography className="text-16 font-medium">{'test'}</Typography>
      </div> */}
      <div className="h-400 w-full p-20">
        <ReactApexChart options={options} series={series} type="treemap" width="100%" height="100%" />
      </div>
    </Paper>
  );
}

export default memo(Widget13);
