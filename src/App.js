import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { Fragment, useContext, Suspense } from 'react';
import AuthContext from './store/auth-context';
import SignInPage from './pages/SignInPage';
// import AdminDashboard from './components/Dashboards/AdminDashboard';
// import MasterDashboard from './components/Dashboards/MasterDashboard';
// import StudentDashboard from './components/Dashboards/StudentDashboard';
const AdminDashboard = React.lazy(() =>
  import('./components/Dashboards/AdminDashboard')
);
const MasterDashboard = React.lazy(() =>
  import('./components/Dashboards/MasterDashboard')
);
const StudentDashboard = React.lazy(() =>
  import('./components/Dashboards/StudentDashboard')
);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <div className='app-container'>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {authCtx.isLoggedIn && (
              <Fragment>
                <Route path='/dashboard'>
                  {authCtx.userRole === 'ADMIN' && <AdminDashboard />}
                  {authCtx.userRole === 'MASTER' && <MasterDashboard />}
                  {authCtx.userRole === 'STUDENT' && <StudentDashboard />}
                </Route>
              </Fragment>
            )}
            <Route path='/signin'>
              <SignInPage />
            </Route>
            <Route path='*'>
              {authCtx.isLoggedIn ? (
                <Redirect to='/dashboard' />
              ) : (
                <Redirect to='/signin' />
              )}
            </Route>
          </Switch>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
