import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

function Widget4(props) {
  const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const vehicleData = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.entities);
  const vehicleDataDate = Object.values(vehicleData).map(i => i.serviceHistory.date);
  const vehicleDataDateSliced = vehicleDataDate.slice(63, vehicleDataDate.length);
  console.log(vehicleDataDateSliced, 'vehicleDataDateSliced');

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <Paper
      style={{ background: '#14213D', color: 'white' }}
      className="w-full rounded-20 shadow flex flex-col justify-start"
    >
      <div className="flex items-center justify-between px-4 pt-8">
        {/* <Select
          native
          className="mx-16"
          classes={{ root: 'py-8 font-medium opacity-75' }}
          value={currentRange}
          onChange={handleChangeRange}
          inputProps={{
            name: 'currentRange'
          }}
          disableUnderline
          variant="standard"
        >
          {Object.entries(props.widget.ranges).map(([key, n]) => {
            return (
              <option key={key} value={key}>
                {n}
              </option>
            );
          })}
        </Select> */}
        <Typography className="text-16 px-16 font-medium">August</Typography>
        <IconButton style={{ color: 'white' }} aria-label="more">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-18 text-white-800 font-normal mb-8">Service</Typography>
        <Typography className="text-72 font-semibold leading-none text-red tracking-tighter">
          {vehicleDataDateSliced.length}
        </Typography>
        <Typography className="text-18 text-800 font-normal">{props.widget.data.name}</Typography>
      </div>
      {/* <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(Widget4);
