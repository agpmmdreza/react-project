import { Fragment } from "react";
import StudentRoutes from "../../routes/StudentRoutes";
import DrawerUI from "../Drawers/DrawerUI";
import NavBar from "../UI/NavBar";

const StudentDashboard = () => {
  return (
    <Fragment>
      <div>
        <NavBar />
        <DrawerUI />
      </div>
      <StudentRoutes />
    </Fragment>
  );
};

export default StudentDashboard;
