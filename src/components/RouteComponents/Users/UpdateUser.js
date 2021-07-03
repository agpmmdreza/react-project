import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useContext, useEffect, useState } from 'react';
import useTitle from '../../../hooks/use-title';
import AuthContext from '../../../store/auth-context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#04c256',
    color: 'black',
  },
  container: {
    '& .MuiTextField-root': {
      margin: '0.5rem',
      placeSelf: 'center',
    },
    borderRadius: '2rem',
    backgroundColor: '#454545',
    minHeight: '300px',
    width: '500px',
    alignContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  items: {
    placeSelf: 'center',
    marginTop: '1rem',
  },
  table: {
    minWidth: '450px',
  },
  textFields: {
    padding: '2rem',
    display: 'grid',
    gridTemplateRows: 'auto auto',
  },
  // tfieldContainer: {
  //   padding: '1rem',
  // },
}));

const UpdateUser = () => {
  useTitle('Update User');
  const INITIAL_VALIDATION = {
    id: {
      value: '',
      error: false,
      helper: '',
    },
    firstName: {
      value: '',
      error: false,
      helper: '',
    },
    lastName: {
      value: '',
      error: false,
      helper: '',
    },
    password: {
      value: '',
      error: false,
      helper: '',
    },
    code: {
      value: '',
      error: false,
      helper: '',
    },
    role: {
      value: '',
      error: false,
    },
  };
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validation, setValidation] = useState(INITIAL_VALIDATION);

  useEffect(() => {
    if (
      validation.code.error ||
      validation.firstName.error ||
      validation.lastName.error ||
      validation.id.error ||
      validation.role.error ||
      validation.code.value === '' ||
      validation.firstName.value === '' ||
      validation.lastName.value === '' ||
      validation.id.value === '' ||
      validation.role.value === ''
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    validation.role.error,
    validation.code.error,
    validation.firstName.error,
    validation.lastName.error,
    validation.id.error,
    validation.code.value,
    validation.firstName.value,
    validation.lastName.value,
    validation.id.value,
    validation.role.value,
  ]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSelectChange = (event) => {
    setValidation((prevState) => ({
      ...prevState,
      role: {
        ...prevState,
        value: event.target.value,
      },
    }));
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
    if (isNaN(validation.code.value)) {
      setValidation((prevState) => ({
        ...prevState,
        code: {
          ...prevState.code,
          error: true,
          helper: 'Enter a Number!',
        },
      }));
    }
    if (isNaN(validation.id.value)) {
      setValidation((prevState) => ({
        ...prevState,
        id: {
          ...prevState.id,
          error: true,
          helper: 'Enter a Number!',
        },
      }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      fetch(`${authCtx.baseURL}/api/users/${validation.id.value}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: validation.firstName.value,
          lastName: validation.lastName.value,
          pass: validation.password.value,
          role: validation.role.value.toUpperCase(),
          code: validation.code.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 'success') {
            setResMessage('Successfully Updated!');
          } else {
            setResMessage('Something Went Wrong!');
          }
          setOpen(true);
        });
      setValidation(INITIAL_VALIDATION);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <form className={classes.textFields} onSubmit={handleFormSubmit}>
          <div>
            <TextField
              value={validation.id.value}
              error={validation.id.error}
              helperText={validation.id.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='id'
              label='ID'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.firstName.value}
              error={validation.firstName.error}
              helperText={validation.firstName.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='firstName'
              label='First Name'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.lastName.value}
              error={validation.lastName.error}
              helperText={validation.lastName.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='lastName'
              label='Last Name'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.code.value}
              error={validation.code.error}
              helperText={validation.code.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='code'
              label='Code'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.password.value}
              error={validation.password.error}
              helperText={validation.password.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='password'
              label='Password'
              type='password'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <Select
              onBlur={handleValidation}
              error={validation.role.error}
              displayEmpty
              name='role'
              value={validation.role.value}
              style={{
                margin: '0.5rem',
                width: '192px',
                height: '40px',
                textAlign: 'left',
              }}
              onChange={handleSelectChange}
              variant='outlined'
            >
              <MenuItem value=''>
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value='Admin'>Admin</MenuItem>
              <MenuItem value='Student'>Student</MenuItem>
              <MenuItem value='Master'>Master</MenuItem>
            </Select>
          </div>
          <div className={classes.items}>
            <Button
              variant='contained'
              size='medium'
              type='submit'
              style={{ minWidth: '192px' }}
            >
              Update User
            </Button>
          </div>
        </form>
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
    </div>
  );
};

export default UpdateUser;
