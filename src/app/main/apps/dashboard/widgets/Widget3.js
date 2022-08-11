import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';

function Widget3(props) {
  const vehicleData = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.entities);
  const Inshop = Object.values(vehicleData).filter(i => i.vehicleStatus === 'inShop').length;
  return (
    <Paper
      style={{ background: '#086788', color: 'white' }}
      className="w-full rounded-20 shadow flex flex-col justify-between"
    >
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium">{props.widget.title}</Typography>
        <IconButton aria-label="more">
          <Icon style={{ color: 'white' }}>more_vert</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-18 text-800 font-normal mb-8">Issues</Typography>
        <Typography className="text-72 font-semibold leading-none text-orange tracking-tighter my-11">
          {Inshop}
        </Typography>
        <Typography className="text-18 font-normal text-white-800">In Shop</Typography>
      </div>
      <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium">
        {/* <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count}</b> */}
      </Typography>
    </Paper>
  );
}

export default memo(Widget3);
