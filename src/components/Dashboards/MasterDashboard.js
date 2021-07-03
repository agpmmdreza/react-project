import { Fragment } from 'react';
import MasterRoutes from '../../routes/MasterRoutes';
import DrawerUI from '../Drawers/DrawerUI';
import NavBar from '../UI/NavBar';

const MasterDashboard = () => {
  return (
    <Fragment>
      <div>
        <NavBar />
        <DrawerUI />
      </div>
      <MasterRoutes />
    </Fragment>
  );
};

export default MasterDashboard;
