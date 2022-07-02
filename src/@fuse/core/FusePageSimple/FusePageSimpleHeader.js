import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import { useSelector } from 'react-redux';

function FusePageSimpleHeader(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <div className={props.classes.header}>
      {props.header && <ThemeProvider theme={contrastTheme}>{props.header}</ThemeProvider>}
    </div>
  );
}

export default FusePageSimpleHeader;
