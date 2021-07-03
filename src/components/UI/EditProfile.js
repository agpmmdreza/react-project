import { IconButton } from '@material-ui/core';
import { Button, TextField, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useState } from 'react';
import useTitle from '../../hooks/use-title';
import { EditRounded, VpnKeyRounded } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  snack: {
    background: '#04c256',
    color: 'black',
  },
  snackError: {
    background: '#EA2027',
  },
  container: {
    backgroundColor: '#454545',
    display: 'grid',
    gridTemplateRows: 'auto 50px',
    minHeight: 'auto',
    width: '400px',
    borderRadius: '1rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: '0 0 200px 200px / 50px',
  },
  items: {
    placeSelf: 'center',
  },
  form: {
    '& .MuiTextField-root': {
      margin: '0.5rem 0',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // margin: '2rem',
    padding: '2rem',
  },
}));

const EditProfile = (props) => {
  useTitle('Edit Profile');
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const INITIAL_VALIDATION = {
    first: {
      value: '',
      error: false,
      helper: '',
    },
    last: {
      value: '',
      error: false,
      helper: '',
    },
  };
  const classes = useStyles();
  const [resMessage, setResMessage] = useState('');
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const [open, setOpen] = useState(false);
  const handleEditClicked = () => {
    if (
      validation.first.value.trim() !== '' &&
      validation.last.value.trim() !== ''
    ) {
      fetch(`${authCtx.baseURL}/api/users/profile`, {
        method: 'POST',
        body: JSON.stringify({
          firstName: validation.first.value,
          lastName: validation.last.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 'success') {
            history.push('/dashboard/profile');
            setResMessage('Successfully Added!');
          } else {
            setResMessage('Something Went Wrong!');
          }
          setOpen(true);
        });
      setValidation(INITIAL_VALIDATION);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOnChange = (event) => {
    setValidation((prevState) => ({
      ...prevState,
      [event.target.name]: {
        ...prevState[event.target.name],
        value: event.target.value,
      },
    }));
    if (validation[event.target.name].value !== '') {
      setValidation((prevState) => ({
        ...prevState,
        [event.target.name]: {
          ...prevState[event.target.name],
          error: false,
          helper: '',
        },
      }));
    }
  };

  const handleChangePassClicked = () => {};

  const handleValidation = (event) => {
    if (validation[event.target.name].value === '') {
      setValidation((prevState) => ({
        ...prevState,
        [event.target.name]: {
          ...prevState[event.target.name],
          error: true,
          helper: 'Enter a value!',
        },
      }));
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.header}>
          <form className={classes.form}>
            <TextField
              value={validation.first.value}
              error={validation.first.error}
              helperText={validation.first.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='first'
              label='First Name'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.last.value}
              error={validation.last.error}
              helperText={validation.last.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='last'
              label='Last Name'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <Button
              variant='contained'
              size='medium'
              fullWidth
              style={{
                background: '#27ae60',
                marginTop: '1rem',
                // width: '192px',
              }}
              onClick={handleEditClicked}
            >
              <EditRounded style={{ marginRight: '0.3rem' }} />
              Edit
            </Button>
          </form>
        </div>
        <div className={classes.items}>
          <Button
            variant='contained'
            size='medium'
            style={{ background: '#c0392b', marginBottom: '2.5rem' }}
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
            root: resMessage.includes('Success')
              ? classes.snack
              : classes.snackError,
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={resMessage}
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

export default EditProfile;
