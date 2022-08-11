import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

function Widget2(props) {
  const vehicleData = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.entities);
  const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const [status, setStatus] = useState(currentRange);
  const Assigned = Object.values(vehicleData).filter(i => i.isAssigned === true).length;
  const Unassigned = Object.values(vehicleData).filter(i => i.isAssigned === false).length;

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
    setStatus(currentRange);
  }

  return (
    <Paper
      style={{ background: '#9b3b4f', color: 'white' }}
      className="w-full rounded-20 shadow flex flex-col justify-start"
    >
      <div className="flex items-center justify-between px-4 pt-8">
        <Select
          style={{ color: 'white' }}
          native
          className="mx-16"
          classes={{ root: 'py-8 font-medium opacity-100' }}
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
              <option style={{ background: 'white', color: 'black' }} key={key} value={key}>
                {n}
              </option>
            );
          })}
        </Select>
        <IconButton style={{ color: 'white' }} aria-label="more">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-18 text-800 font-normal mb-8">{`${
          currentRange === 'Assigned' ? 'Assigned' : 'Unassigned'
        } Vehicles`}</Typography>
        <Typography className="text-72 font-semibold leading-none  tracking-tighter">
          {currentRange === 'Assigned' ? Assigned : Unassigned}
        </Typography>
      </div>
      {/* <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(Widget2);
