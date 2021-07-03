import { Fragment } from "react";
import AdminRoutes from "../../routes/AdminRoutes";
import DrawerUI from "../Drawers/DrawerUI";
import NavBar from "../UI/NavBar";

const AdminDashboard = () => {
  return (
    <Fragment>
      <div>
        <NavBar />
        <DrawerUI />
      </div>
      <AdminRoutes />
    </Fragment>
  );
};

export default AdminDashboard;
