import { Button, IconButton, Snackbar, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useContext, useEffect, useState } from 'react';
import useTitle from '../../../hooks/use-title';
import AuthContext from '../../../store/auth-context';
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
  // tfieldContainer: {
  //   padding: '1rem',
  // },
}));

const AddCourse = () => {
  useTitle('Add Course');
  const INITIAL_VALIDATION = {
    title: {
      value: '',
      error: false,
      helper: '',
    },
    unit: {
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
      validation.title.error ||
      validation.unit.error ||
      validation.title.value === '' ||
      validation.unit.value === ''
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    validation.title.error,
    validation.unit.error,
    validation.title.value,
    validation.unit.value,
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
    if (isNaN(validation.unit.value)) {
      setValidation((prevState) => ({
        ...prevState,
        unit: {
          ...prevState.unit,
          error: true,
          helper: 'Enter a Number!',
        },
      }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      fetch(`${authCtx.baseURL}/api/courses`, {
        method: 'POST',
        body: JSON.stringify({
          title: validation.title.value,
          unitsCount: validation.unit.value,
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
              value={validation.title.value}
              error={validation.title.error}
              helperText={validation.title.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='title'
              label='Title'
              color='secondary'
              size='small'
              style={{ width: '12rem' }}
            />
            <TextField
              value={validation.unit.value}
              error={validation.unit.error}
              helperText={validation.unit.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='unit'
              label='Units Count'
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
              Add Course
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

export default AddCourse;
