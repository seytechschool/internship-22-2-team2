import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import { memo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function Widget9(props) {
  const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const widget = _.merge({}, props.widget);
  const theme = useTheme();
  const vehicleData = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.entities);
  const fuelCost = Object.values(vehicleData)
    .map(i => Math.round(i.fuelHistory.cost))
    .reduce((a, b) => a + b);
  const serviceCost = Object.values(vehicleData)
    .map(i => Math.round(i.serviceHistory.cost))
    .reduce((a, b) => a + b);
  const totalCost = fuelCost + serviceCost;
  const totalBadget = 2000000;

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20 h-64">
        <Typography className="text-16 font-medium">{widget.title}</Typography>

        {/* <Select
          native
          value={currentRange}
          onChange={handleChangeRange}
          inputProps={{
            name: 'currentRange'
          }}
          className="font-medium opacity-75"
          disableUnderline
        >
          {Object.entries(widget.ranges).map(([key, n]) => {
            return (
              <option key={key} value={key}>
                {n}
              </option>
            );
          })}
        </Select> */}
      </div>
      {['totalSpent', 'remaining'].map(id => (
        <div className="flex flex-wrap items-center w-full p-12" key={id}>
          <div className="flex flex-col w-full sm:w-1/2 p-8">
            <Typography className="text-13 text-blue font-semibold" color="textSecondary">
              {widget[id].title}
            </Typography>
            <div className="flex items-center">
              <Typography className="text-32 text-green font-normal">$</Typography>
              <Typography
                className={
                  totalBadget - totalCost > 0
                    ? 'text-32 mx-4 font-medium text-black tracking-tighter'
                    : 'text-32 mx-4 text-red font-medium tracking-tighter'
                }
              >
                {id === 'totalSpent' ? totalCost.toLocaleString() : (totalBadget - totalCost).toLocaleString()}
              </Typography>
            </div>
          </div>
          {/* <div className="flex w-full sm:w-1/2">
            <div className="h-64 w-full">
              <ReactApexChart
                options={{ ...widget[id].chart.options, colors: [theme.palette.secondary.main] }}
                series={widget[id].chart[currentRange].series}
                type={widget[id].chart.options.chart.type}
                height={widget[id].chart.options.chart.height}
              />
            </div>
          </div> */}
        </div>
      ))}
      <Divider />
      <div className="flex flex-col w-full p-20">
        <Typography className="text-13 text-red font-semibold" color="textSecondary">
          {widget.totalBudget.title}
        </Typography>
        <div className="flex items-center">
          <Typography className="text-32 text-green font-normal">$</Typography>
          <Typography className="text-32 mx-4 font-medium tracking-tighter">{totalBadget.toLocaleString()}</Typography>
        </div>
      </div>
    </Paper>
  );
}

export default memo(Widget9);
