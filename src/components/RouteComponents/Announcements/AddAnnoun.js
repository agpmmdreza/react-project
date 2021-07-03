import { Button, IconButton, Snackbar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../store/auth-context';
import useTitle from '../../../hooks/use-title';

const useStyles = makeStyles((theme) => ({
  snack: {
    background: '#04c256',
    color: 'black',
  },
  snackError: {
    background: '#EA2027',
  },
  container: {
    '& .MuiTextField-root': {
      margin: '0.5rem',
      placeSelf: 'center',
    },
    borderRadius: '2rem',
    backgroundColor: '#454545',
    minHeight: '300px',
    width: 'auto',
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
}));

const AddAnnoun = () => {
  useTitle('Add Announcements');
  const INITIAL_VALIDATION = {
    message: {
      value: '',
      error: false,
      helper: '',
    },
    id: {
      value: '',
      error: false,
      helper: '',
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
      validation.message.error ||
      validation.id.error ||
      validation.message.value === '' ||
      validation.id.value === ''
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    validation.message.error,
    validation.id.error,
    validation.message.value,
    validation.id.value,
  ]);

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
      fetch(`${authCtx.baseURL}/api/announcements`, {
        method: 'POST',
        body: JSON.stringify({
          timeTableId: validation.id.value,
          message: validation.message.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 'success') {
            setResMessage('Successfully Added!');
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
              label='Time Table ID'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.message.value}
              error={validation.message.error}
              helperText={validation.message.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='message'
              label='Message'
              multiline
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
          </div>
          <div className={classes.items}>
            <Button
              variant='contained'
              size='medium'
              type='submit'
              style={{ minWidth: '192px' }}
            >
              Add Announcements
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
            <IconButton size='small' color='inherit' onClick={handleClose}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  );
};

export default AddAnnoun;
