import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Fragment, useContext, useState } from 'react';
import useTitle from '../../../hooks/use-title';
import AuthContext from '../../../store/auth-context';
import { makeStyles } from '@material-ui/core/styles';

let response;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#454545',
    display: 'grid',
    gridTemplateRows: '80px auto',
    minHeight: '550px',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#455a64',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'center',
  },
  items: {
    padding: '2rem',
    placeSelf: 'center',
  },
  table: {
    minWidth: '450px',
  },
  inner: {
    width: '250px',
  },
}));

const UserList = () => {
  useTitle('Get User List');
  const authCtx = useContext(AuthContext);
  const [validation, setValidation] = useState({
    value: '',
    helperText: '',
    error: false,
  });
  const [tableShow, setTableShow] = useState(false);
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleGetUsers = () => {
    fetch(`${authCtx.baseURL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData != null) {
          response = resData.data.list;
          setTableShow(false);
          setTableShow(true);
        } else {
          console.log(resData.message);
        }
      });
  };

  const handleIdValidation = () => {
    if (validation.value === '') {
      setValidation((prevState) => ({
        ...prevState,
        helperText: 'ID Needed!',
        error: true,
      }));
    } else if (isNaN(validation.value)) {
      setValidation((prevState) => ({
        ...prevState,
        helperText: 'Enter a Number!',
        error: true,
      }));
    }
  };

  const handleOnChage = (event) => {
    validation.value = event.target.value;
    if (event.target.value !== '') {
      setValidation((prevState) => ({
        ...prevState,
        helperText: '',
        error: false,
      }));
    } else if (typeof event.target.value != 'number') {
      setValidation((prevState) => ({
        ...prevState,
        helperText: '',
        error: false,
      }));
    }
  };

  const handleGetUsersById = () => {
    // Code For Getting Users By ID
    if (validation.value.trim() !== '') {
      fetch(`${authCtx.baseURL}/api/users/${validation.value}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.data != null) {
            response = [resData.data];
            setTableShow(false);
            setTableShow(true);
          }
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.inner}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleGetUsers}
            >
              Get User List
            </Button>
          </div>
          <div>
            <TextField
              value={validation.value}
              error={validation.error}
              helperText={validation.helperText}
              onChange={handleOnChage}
              onBlur={handleIdValidation}
              variant='outlined'
              label='ID'
              color='primary'
              size='small'
              style={{ width: '6rem', margin: '0 1rem' }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleGetUsersById}
            >
              Get Users By id
            </Button>
          </div>
        </div>
        <div className={classes.items}>
          {tableShow ? (
            <Fragment>
              <TableContainer component={Paper}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label='simple table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell component='th' scope='row'>
                            {row.id}
                          </TableCell>
                          <TableCell align='left'>{row.lastName}</TableCell>
                          <TableCell align='left'>{row.firstName}</TableCell>
                          <TableCell align='left'>{row.code}</TableCell>
                          <TableCell align='left'>{row.role}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component='div'
                labelRowsPerPage=''
                rowsPerPageOptions={[]}
                count={response.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
              />
            </Fragment>
          ) : (
            <p style={{ color: 'white' }}>There is no data!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
