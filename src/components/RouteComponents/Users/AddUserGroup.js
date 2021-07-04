import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { AddBoxRounded, CloseOutlined } from '@material-ui/icons';
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
    width: 'auto',
    alignContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#455a64',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 'auto',
  },
  items: {
    placeSelf: 'center',
  },
  table: {
    minWidth: '450px',
  },
  textFields: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formStyle: {
    padding: '2rem',
    display: 'grid',
    gridTemplateRows: 'auto auto',
  },
}));

const AddUserGroup = () => {
  useTitle('Add User Group');
  const [resMessage, setResMessage] = useState('');
  const classes = useStyles();
  const INIT_BODY = {
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
      helper: '',
    },
  };
  const INITIAL_VALIDATION = [INIT_BODY];
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputFields, setinputFields] = useState(INITIAL_VALIDATION);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    inputFields.forEach((item) => {
      for (const prop in item) {
        if (prop.error || prop.value === '') {
          setIsFormValid(false);
        } else {
          setIsFormValid(false);
        }
      }
    });
  }, [inputFields]);

  const handleOnChange = (index, event) => {
    setinputFields((prevState) => {
      return prevState.map((item, i) => {
        if (index !== i) {
          return item;
        }
        return {
          ...item,
          [event.target.name]: {
            ...item[event.target.name],
            value: event.target.value,
          },
        };
      });
    });

    if (inputFields[index][event.target.name].value !== '') {
      setinputFields((prevState) => {
        return prevState.map((item, i) => {
          if (index !== i) {
            return item;
          }
          return {
            ...item,
            [event.target.name]: {
              ...item[event.target.name],
              error: false,
              helper: '',
            },
          };
        });
      });
    }
  };

  const handleValidation = (index, event) => {
    // console.log(inputFields[index][event.target.name]);
    console.log(event);
    if (inputFields[index][event.target.name].value === '') {
      setinputFields((prevState) => {
        return prevState.map((item, i) => {
          if (index !== i) {
            return item;
          }
          return {
            ...item,
            [event.target.name]: {
              ...item[event.target.name],
              error: true,
              helper: 'Enter value!',
            },
          };
        });
      });
    }
    if (isNaN(inputFields[index].code.value)) {
      setinputFields((prevState) => {
        return prevState.map((item, i) => {
          if (index !== i) {
            return item;
          }
          return {
            ...item,
            code: {
              ...item.code,
              error: true,
              helper: 'Enter a Number!',
            },
          };
        });
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      fetch(`${authCtx.baseURL}/api/users/addlist`, {
        method: 'POST',
        body: JSON.stringify(
          inputFields.map((item) => ({
            lastName: item.lastName.value,
            firstName: item.firstName.value,
            password: item.password.value,
            code: item.code.value,
            role: item.role.value,
          }))
        ),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 'success') {
            setResMessage('Successfully Added!');
            setinputFields([INIT_BODY]);
          } else {
            setResMessage('Something Went Wrong!');
          }
          setOpen(true);
        });
    }
  };

  const handleAddIconClicked = () => {
    setinputFields((prevState) => [...prevState, INIT_BODY]);
  };

  return (
    <div>
      <div className={classes.container}>
        <form className={classes.formStyle} onSubmit={handleFormSubmit}>
          <div>
            {inputFields.map((input, index) => (
              <div key={index} className={classes.textFields}>
                <TextField
                  value={input.firstName.value}
                  error={input.firstName.error}
                  helperText={input.firstName.helper}
                  onChange={(event) => handleOnChange(index, event)}
                  onBlur={(event) => handleValidation(index, event)}
                  variant='outlined'
                  name='firstName'
                  label='First Name'
                  color='secondary'
                  size='small'
                  style={{ width: '10rem' }}
                />
                <TextField
                  value={input.lastName.value}
                  error={input.lastName.error}
                  helperText={input.lastName.helper}
                  onChange={(event) => handleOnChange(index, event)}
                  onBlur={(event) => handleValidation(index, event)}
                  variant='outlined'
                  name='lastName'
                  label='Last Name'
                  color='secondary'
                  size='small'
                  style={{ width: '10rem' }}
                />
                <TextField
                  value={input.password.value}
                  error={input.password.error}
                  helperText={input.password.helper}
                  onChange={(event) => handleOnChange(index, event)}
                  onBlur={(event) => handleValidation(index, event)}
                  variant='outlined'
                  name='password'
                  label='Password'
                  color='secondary'
                  size='small'
                  style={{ width: '9rem' }}
                />
                <TextField
                  value={input.code.value}
                  error={input.code.error}
                  helperText={input.code.helper}
                  onChange={(event) => handleOnChange(index, event)}
                  onBlur={(event) => handleValidation(index, event)}
                  variant='outlined'
                  name='code'
                  label='Code'
                  color='secondary'
                  size='small'
                  style={{ width: '8rem' }}
                />
                <Select
                  onBlur={(event) => handleValidation(index, event)}
                  error={input.role.error}
                  displayEmpty
                  name='role'
                  value={input.role.value}
                  style={{
                    margin: '0.5rem',
                    width: '192px',
                    height: '40px',
                    textAlign: 'left',
                  }}
                  onChange={(event) => handleOnChange(index, event)}
                  variant='outlined'
                >
                  <MenuItem value=''>
                    <em>Select Role</em>
                  </MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='student'>Student</MenuItem>
                  <MenuItem value='master'>Master</MenuItem>
                </Select>
              </div>
            ))}
            <IconButton
              size='small'
              onClick={handleAddIconClicked}
              style={{
                display: 'inline-block',
                float: 'right',
                color: 'white',
              }}
            >
              <AddBoxRounded />
            </IconButton>
          </div>
          <div className={classes.items}>
            <Button
              variant='contained'
              size='medium'
              type='submit'
              style={{ minWidth: '192px' }}
            >
              Add Users
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
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  );
};

export default AddUserGroup;
