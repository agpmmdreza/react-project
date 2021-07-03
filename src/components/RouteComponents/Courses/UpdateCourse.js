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
    display: 'flex',
    alignItems: 'center',
    width: '500px',
  },
  header: {
    backgroundColor: '#455a64',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 'auto',
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

const UpdateCourse = () => {
  useTitle('Update Course');
  const classes = useStyles();
  const INITIAL_VALIDATION = {
    id: {
      value: '',
      error: false,
      helper: '',
    },
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
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validation, setValidation] = useState(INITIAL_VALIDATION);

  useEffect(() => {
    if (
      validation.id.error ||
      validation.unit.error ||
      validation.title.error ||
      validation.id.value === '' ||
      validation.unit.value === '' ||
      validation.title.value === ''
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    validation.id.error,
    validation.unit.error,
    validation.title.error,
    validation.id.value,
    validation.unit.value,
    validation.title.value,
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
      fetch(`${authCtx.baseURL}/api/courses/${validation.id.value}`, {
        method: 'PUT',
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
            setResMessage('Successfully Updated!');
          } else if (resData.data === null) {
            setResMessage('No match found!');
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
              value={validation.title.value}
              error={validation.title.error}
              helperText={validation.title.helper}
              onChange={handleOnChange}
              onBlur={handleValidation}
              variant='outlined'
              name='title'
              label='Label'
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
              Update Course
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

export default UpdateCourse;
