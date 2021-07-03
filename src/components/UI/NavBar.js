import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccountCircleRounded,
  DashboardRounded,
  ExitToApp,
  MenuRounded,
} from '@material-ui/icons';
import clsx from 'clsx';
import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navlist: {
    '& li': {
      margin: '0 1rem',
    },
    display: 'flex',
    alignItems: 'center',
    listStyleType: 'none',
    textAlign: 'center',
  },
  menuBg: {
    backgroundColor: '#3D3D3D',
    color: 'white',
    '& .MuiList-padding': {
      padding: '0',
    },
    '& .MuiMenuItem-root': {
      padding: '1.1rem',
      '&:hover': {
        backgroundColor: '#0C77B6',
      },
    },
  },
  textlink: {
    '&:link': {
      color: 'white',
      textDecoration: 'none',
    },

    '&:visited': {
      color: 'white',
      textDecoration: 'none',
    },

    '&:hover': {
      color: '#7cf2ee',
      textDecoration: 'none',
    },

    '&:active': {
      color: 'blue',
      textDecoration: 'none',
    },
  },
}));

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    setAnchorEl(null);
    authCtx.logout();
  };

  const accountButtonClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const accountButtonCloseHandler = (event) => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    authCtx.openDrawer();
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: authCtx.isDrawerOpen,
        })}
      >
        <Toolbar className={classes.navbar}>
          {!authCtx.isLoggedIn && (
            <p className={classes.title}> Management System</p>
          )}
          <ul className={classes.navlist}>
            {authCtx.isLoggedIn ? (
              <Fragment>
                <Fragment>
                  <IconButton
                    color='inherit'
                    onClick={handleDrawerOpen}
                    edge='start'
                    className={clsx(
                      classes.menuButton,
                      authCtx.isDrawerOpen && classes.hide
                    )}
                  >
                    <MenuRounded />
                  </IconButton>
                  <p>{authCtx.navTitle}</p>
                </Fragment>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to='/signin' className={classes.textlink} from='signin'>
                    Sign in
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          {authCtx.isLoggedIn && (
            <Fragment>
              <IconButton
                color='inherit'
                aria-label='upload picture'
                component='span'
                onClick={accountButtonClickHandler}
              >
                <AccountCircleRounded
                  style={{ color: 'white', fontSize: 30 }}
                />
              </IconButton>
              <Menu
                classes={{ paper: classes.menuBg }}
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={accountButtonCloseHandler}
              >
                <MenuItem
                  onClick={accountButtonCloseHandler}
                  component={Link}
                  to='/dashboard/profile'
                >
                  <AccountCircleRounded
                    style={{
                      color: 'white',
                      fontSize: 30,
                      marginRight: '0.5rem',
                    }}
                  />
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={accountButtonCloseHandler}
                  component={Link}
                  to='/dashboard'
                >
                  <DashboardRounded
                    style={{
                      color: 'white',
                      fontSize: 30,
                      marginRight: '0.5rem',
                    }}
                  />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={logoutHandler} component={Link} to='/signin'>
                  <ExitToApp
                    style={{
                      color: 'white',
                      fontSize: 30,
                      marginRight: '0.5rem',
                    }}
                  />
                  Logout
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
