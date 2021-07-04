import { Button, FormControl, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: '0.5rem',
      placeSelf: 'center',
    },
  },
  main: {
    width: 'auto',
    backgroundColor: '#33364a',
    borderRadius: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    marginTop: '1rem',
  },
}));

const INITIAL_VALIDATION = {
  userName: {
    value: '',
    error: false,
    helper: '',
  },
  password: {
    value: '',
    error: false,
    helper: '',
  },
};

const SignInForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [url, setUrl] = useState('');
  const [validation, setValidation] = useState(INITIAL_VALIDATION);
  const [urlField, setUrlField] = useState(false);

  const urlButtonHandler = (event) => {
    if (urlField) {
      if (url.trim() !== '') {
        authCtx.setBaseURL(url);
      }
    } else {
      setUrlField(!urlField);
    }
  };

  const handleOnChange = (event) => {
    setValidation((prevState) => ({
      ...prevState,
      [event.target.name]: {
        ...prevState[event.target.name],
        value: event.target.value,
      },
    }));
    if (event.target.value !== '') {
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
    if (event.target.value === '') {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validation.password.value !== '' && validation.userName.value !== '') {
      fetch(`${authCtx.baseURL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          code: validation.userName.value,
          password: validation.password.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          const data = resData.data;
          if (data != null) {
            authCtx.login(data.token, data.user.role, data.expireAt);
            history.replace('/dashboard');
          } else {
            console.log(resData.message);
          }
        });
    }
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.main}>
        <form className={classes.root} onSubmit={handleFormSubmit}>
          <FormControl>
            <TextField
              fullWidth
              onBlur={handleValidation}
              error={validation.userName.error}
              value={validation.userName.value}
              helperText={validation.userName.helper}
              color='secondary'
              name='userName'
              label='Username'
              variant='outlined'
              onChange={handleOnChange}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              fullWidth
              onBlur={handleValidation}
              error={validation.password.error}
              value={validation.password.value}
              helperText={validation.password.helper}
              color='secondary'
              label='Password'
              name='password'
              onChange={handleOnChange}
              variant='outlined'
              style={{ marginBottom: '1rem' }}
            />
          </FormControl>
          <Button fullWidth variant='contained' color='secondary' type='submit'>
            Sign in
          </Button>
        </form>
      </div>
      <div className={classes.base}>
        <Button onClick={urlButtonHandler} style={{ marginRight: '.5rem' }}>
          {urlField ? 'Set URL' : 'Base URL'}
        </Button>
        {urlField && (
          <TextField
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder='Enter URL'
          ></TextField>
        )}
      </div>
    </Fragment>
  );
};

export default SignInForm;
