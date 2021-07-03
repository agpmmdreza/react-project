import { Button, IconButton, Snackbar, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment, useContext, useState } from 'react';
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
    backgroundColor: '#454545',
    display: 'grid',
    gridTemplateRows: '170px 60px',
    minHeight: '230px',
    width: '400px',
  },
  header: {
    backgroundColor: '#455a64',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    placeSelf: 'center',
  },
  table: {
    minWidth: '450px',
  },
}));

const ChooseTimeTable = () => {
  useTitle('Choose Time Table');
  const classes = useStyles();
  const INITIAL_VALIDATION = {
    value: '',
    error: false,
    helper: '',
  };
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const handleChooseClick = () => {
    if (validation.value !== '') {
      fetch(`${authCtx.baseURL}/api/timetables/${validation.value}/choose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 'success') {
            setResMessage('Successfully Chosen!');
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOnChange = (event) => {
    setValidation((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
    if (validation.value !== '') {
      setValidation((prevState) => ({
        ...prevState,
        error: false,
        helper: '',
      }));
    }
  };

  const handleValidation = () => {
    if (validation.value === '') {
      setValidation((prevState) => ({
        ...prevState,
        error: true,
        helper: 'Enter a value!',
      }));
    }
    if (isNaN(validation.value)) {
      setValidation((prevState) => ({
        ...prevState,
        error: true,
        helper: 'Enter a Number!',
      }));
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <TextField
            value={validation.value}
            error={validation.error}
            helperText={validation.helper}
            onChange={handleOnChange}
            onBlur={handleValidation}
            variant='outlined'
            label='ID'
            color='secondary'
            size='small'
            style={{ width: '12rem', marginBottom: '1rem' }}
          />
        </div>
        <div className={classes.items}>
          <Button
            variant='contained'
            size='medium'
            style={{ minWidth: '192px', background: '#e74c3c' }}
            onClick={handleChooseClick}
          >
            Choose Course
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
        autoHideDuration={4000}
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

export default ChooseTimeTable;
