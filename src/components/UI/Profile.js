import { Avatar, Button, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useContext, useEffect, useState } from 'react';
import useTitle from '../../hooks/use-title';
import { EditRounded, VpnKeyRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#04c256',
    color: 'black',
  },
  container: {
    backgroundColor: '#454545',
    display: 'grid',
    gridTemplateRows: 'auto auto',
    minHeight: '450px',
    width: '400px',
    borderRadius: '1rem',
  },
  header: {
    boxShadow:
      '0 2.1px 1.9px -9px rgba(0, 0, 0, 0.065), 0 5px 4.4px -9px rgba(0, 0, 0, 0.093), 0 8.9px 7.9px -9px rgba(0, 0, 0, 0.115), 0 14.8px 13.2px -9px rgba(0, 0, 0, 0.135), 0 24.3px 21.7px -9px rgba(0, 0, 0, 0.157), 0 42.5px 37.9px -9px rgba(0, 0, 0, 0.185), 0 92px 82px -9px rgba(0, 0, 0, 0.25) ;',
    background:
      'linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%);',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0 0 200px 200px / 50px',
  },
  items: {
    placeSelf: 'center',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

let response;

const Profile = () => {
  useTitle('Profile');
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleEditClicked = () => {};
  const handleChangePassClicked = () => {};

  useEffect(() => {
    setIsLoading(true);
    fetch(`${authCtx.baseURL}/api/users/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data != null) {
          response = resData.data;
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.avatar}>
            <Avatar
              style={{
                justifySelf: 'center',
                width: '100px',
                height: '100px',
                border: '0.2rem solid lightgray',
              }}
            ></Avatar>
            <p
              style={{
                marginTop: '1.5rem',
                color: '#303030',
                fontWeight: 'bold',
                fontSize: '2rem',
                letterSpacing: '0.1rem',
              }}
            >
              {isLoading
                ? 'Loading...'
                : response.firstName + ' ' + response.lastName}
            </p>
            <h4
              style={{
                marginTop: '0.6rem',
                color: '#303030',
                fontSize: '1.2rem',
              }}
            >
              {isLoading ? 'Loading...' : response.role}
            </h4>
          </div>
        </div>
        <div className={classes.items}>
          <Button
            variant='contained'
            size='medium'
            style={{ background: '#1abc9c' }}
            component={Link}
            to='/dashboard/profile/edit-profile'
            onClick={handleEditClicked}
          >
            <EditRounded style={{ marginRight: '0.3rem' }} />
            Edit Profile
          </Button>
          <Button
            variant='contained'
            size='medium'
            style={{ background: '#c0392b', marginLeft: '1rem' }}
            component={Link}
            to='/dashboard/profile/change-pass'
            onClick={handleChangePassClicked}
          >
            <VpnKeyRounded style={{ marginRight: '0.3rem' }} />
            Change Password
          </Button>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        ContentProps={{
          classes: {
            root: classes.root,
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Successfully Chosen!'
        action={
          <Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default Profile;
