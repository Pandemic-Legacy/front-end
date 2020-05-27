import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'auto',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  legendPaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
