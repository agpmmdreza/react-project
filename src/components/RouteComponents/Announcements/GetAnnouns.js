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
    minHeight: '450px',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#455a64',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'center',
  },
  items: {
    placeSelf: 'center',
    padding: '2rem',
  },
  table: {
    minWidth: '450px',
  },
  inner: {
    width: '250px',
  },
}));

const GetAnnounns = () => {
  useTitle('Get Announcement List');
  const authCtx = useContext(AuthContext);
  const [tableShow, setTableShow] = useState(false);
  const rowsPerPage = 10;
  const [errMessage, setErrMessage] = useState('There is no data!');
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const [validation, setValidation] = useState({
    value: '',
    helperText: '',
    error: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleGetAnnouncements = () => {
    fetch(`${authCtx.baseURL}/api/announcements`, {
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
    setValidation((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
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

  const handleGetAnnounsById = () => {
    // Code For Getting Announcements By ID
    if (validation.value.trim() !== '') {
      fetch(`${authCtx.baseURL}/api/announcements/${validation.value}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.data != null) {
            response = resData.data.list;
            setTableShow(false);
            setTableShow(true);
          } else {
            setTableShow(false);
            setErrMessage('Nothing was found!');
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
              onClick={handleGetAnnouncements}
            >
              Get Announcements
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
              onClick={handleGetAnnounsById}
            >
              Get Announcements By id
            </Button>
          </div>
        </div>
        <div className={classes.items}>
          {tableShow ? (
            <Fragment>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  aria-label='simple table'
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Master</TableCell>
                      <TableCell>Day (Bell)</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Message</TableCell>
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
                          <TableCell align='left'>
                            {row.timeTable.master.user.firstName +
                              ' ' +
                              row.timeTable.master.user.lastName}
                          </TableCell>
                          <TableCell align='left'>
                            {row.timeTable.timeTableBellList.map((item) => (
                              <p>
                                {item.day.label + '(' + item.bell.label + ')'}
                              </p>
                            ))}
                          </TableCell>
                          <TableCell align='left'>
                            {row.timeTable.course.title}
                          </TableCell>
                          <TableCell align='left'> {row.message} </TableCell>
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
            <p style={{ color: 'white' }}>{errMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAnnounns;
