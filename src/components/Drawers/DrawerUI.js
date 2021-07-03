import { Divider, Drawer, IconButton } from '@material-ui/core';
import { ChevronLeftRounded } from '@material-ui/icons';
import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { AdminDrawer } from './AdminDrawer';
import { MasterDrawer } from './MasterDrawer';
import { StudentDrawer } from './StudentDrawer';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'white',
    background: 'linear-gradient(to bottom , #1E3C4E, #030303);',
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolbar: {
    textAlign: 'left',
    padding: '1.4rem',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  divider: {
    background: 'white',
  },
}));

const DrawerUI = () => {
  const authCtx = useContext(AuthContext);
  const classes = useStyles();
  const handleDrawerClose = () => {
    authCtx.closeDrawer();
  };

  return (
    <Fragment>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        open={authCtx.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftRounded />
          </IconButton>
        </div>
        <Divider style={{ background: 'white' }} />

        {authCtx.userRole === 'ADMIN' && <AdminDrawer />}
        {authCtx.userRole === 'MASTER' && <MasterDrawer />}
        {authCtx.userRole === 'STUDENT' && <StudentDrawer />}
      </Drawer>
    </Fragment>
  );
};

export default DrawerUI;
