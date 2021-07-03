import { Button, IconButton, Snackbar } from '@material-ui/core';
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

const StartProcessing = () => {
  useTitle('Start Processing');
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const handleChooseClick = () => {
    // if (validation.value !== '') {
    //   fetch(`${authCtx.baseURL}/api/timetables/${validation.value}/choose`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${authCtx.token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((resData) => {
    //
    //       if (resData.status === 'success') {
    //         setResMessage('Successfully Deleted!');
    //       } else if (resData.data === null) {
    //         setResMessage('No match found!');
    //       } else {
    //         setResMessage('Something Went Wrong!');
    //       }
    //       setOpen(true);
    //     });
    //   setValidation(INITIAL_VALIDATION);
    // }
    fetch(`${authCtx.baseURL}/api/timetables/startprocess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 'success') {
          setResMessage('Successfully Processed!');
        } else if (resData.data === null) {
          setResMessage(resData.message);
        } else {
          setResMessage('Something Went Wrong!');
        }
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}></div>
        <div className={classes.items}>
          <Button
            variant='contained'
            size='medium'
            style={{ minWidth: '192px', background: '#e74c3c' }}
            onClick={handleChooseClick}
          >
            Choose Time Table
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

export default StartProcessing;
