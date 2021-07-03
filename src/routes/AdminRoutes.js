import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../store/auth-context";
import clsx from "clsx";
import React, { Suspense } from "react";
const UpdateDay = React.lazy(() =>
  import("../components/RouteComponents/Days/UpdateDay")
);
const UserList = React.lazy(() =>
  import("../components/RouteComponents/Users/UserList")
);
const AddUser = React.lazy(() =>
  import("../components/RouteComponents/Users/AddUser")
);
const DeleteUser = React.lazy(() =>
  import("../components/RouteComponents/Users/DeleteUser")
);
const UpdateUser = React.lazy(() =>
  import("../components/RouteComponents/Users/UpdateUser")
);
const AddUserGroup = React.lazy(() =>
  import("../components/RouteComponents/Users/AddUserGroup")
);
const GetBells = React.lazy(() =>
  import("../components/RouteComponents/Bells/GetBells")
);
const AddBell = React.lazy(() =>
  import("../components/RouteComponents/Bells/AddBell")
);
const UpdateBells = React.lazy(() =>
  import("../components/RouteComponents/Bells/UpdateBells")
);
const DeleteBells = React.lazy(() =>
  import("../components/RouteComponents/Bells/DeleteBells")
);
const AddAnnoun = React.lazy(() =>
  import("../components/RouteComponents/Announcements/AddAnnoun")
);
const DeleteAnnoun = React.lazy(() =>
  import("../components/RouteComponents/Announcements/DeleteAnnoun")
);
const GetAnnouns = React.lazy(() =>
  import("../components/RouteComponents/Announcements/GetAnnouns")
);
const GetCourses = React.lazy(() =>
  import("../components/RouteComponents/Courses/GetCourses")
);
const AddCourse = React.lazy(() =>
  import("../components/RouteComponents/Courses/AddCourse")
);
const DeleteCoures = React.lazy(() =>
  import("../components/RouteComponents/Courses/DeleteCourse")
);
const UpdateCourse = React.lazy(() =>
  import("../components/RouteComponents/Courses/UpdateCourse")
);
const CourseTimeTable = React.lazy(() =>
  import("../components/RouteComponents/Courses/CourseTimeTable")
);
const CourseMasters = React.lazy(() =>
  import("../components/RouteComponents/Courses/CourseMasters")
);
const ChooseCourse = React.lazy(() =>
  import("../components/RouteComponents/Courses/ChooseCourse")
);
const TimeTable = React.lazy(() =>
  import("../components/RouteComponents/TimeTables/TimeTable")
);
const StartProcessing = React.lazy(() =>
  import("../components/RouteComponents/TimeTables/StartProcessing")
);
const TimeTableBells = React.lazy(() =>
  import("../components/RouteComponents/TimeTableBells/TimeTableBells")
);
const DeleteTimeTableBells = React.lazy(() =>
  import("../components/RouteComponents/TimeTableBells/DeleteTimeTableBells")
);
const Profile = React.lazy(() => import("../components/UI/Profile"));
const EditProfile = React.lazy(() => import("../components/UI/EditProfile"));
const ChangePass = React.lazy(() => import("../components/UI/ChangePass"));
const GetDays = React.lazy(() =>
  import("../components/RouteComponents/Days/GetDays")
);

const DeleteDay = React.lazy(() =>
  import("../components/RouteComponents/Days/DeleteDay")
);

const AddDay = React.lazy(() =>
  import("../components/RouteComponents/Days/AddDay")
);

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: "center",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    justifySelf: "center",
    // minWidth: '700px',
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

const AdminRoutes = () => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: authCtx.isDrawerOpen,
        })}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/dashboard/profile">
              <Profile />
            </Route>
            <Route path="/dashboard/profile/edit-profile">
              <EditProfile />
            </Route>
            <Route path="/dashboard/profile/change-pass">
              <ChangePass />
            </Route>
            <Route path="/dashboard/days">
              <GetDays />
            </Route>
            <Route path="/dashboard/add-day">
              <AddDay />
            </Route>
            <Route path="/dashboard/delete-day">
              <DeleteDay />
            </Route>
            <Route path="/dashboard/update-day">
              <UpdateDay />
            </Route>
            <Route path="/dashboard/user-list">
              <UserList />
            </Route>
            <Route path="/dashboard/add-user">
              <AddUser />
            </Route>
            <Route path="/dashboard/delete-user">
              <DeleteUser />
            </Route>
            <Route path="/dashboard/update-user">
              <UpdateUser />
            </Route>
            <Route path="/dashboard/add-user-group">
              <AddUserGroup />
            </Route>
            <Route path="/dashboard/bells">
              <GetBells />
            </Route>
            <Route path="/dashboard/add-bells">
              <AddBell />
            </Route>
            <Route path="/dashboard/delete-bells">
              <DeleteBells />
            </Route>
            <Route path="/dashboard/update-bells">
              <UpdateBells />
            </Route>
            <Route path="/dashboard/announ">
              <GetAnnouns />
            </Route>
            <Route path="/dashboard/add-announ">
              <AddAnnoun />
            </Route>
            <Route path="/dashboard/delete-announ">
              <DeleteAnnoun />
            </Route>
            <Route path="/dashboard/courses">
              <GetCourses />
            </Route>
            <Route path="/dashboard/add-course">
              <AddCourse />
            </Route>
            <Route path="/dashboard/delete-course">
              <DeleteCoures />
            </Route>
            <Route path="/dashboard/update-course">
              <UpdateCourse />
            </Route>
            <Route path="/dashboard/course-timetables">
              <CourseTimeTable />
            </Route>
            <Route path="/dashboard/course-masters">
              <CourseMasters />
            </Route>
            <Route path="/dashboard/choose-course">
              <ChooseCourse />
            </Route>
            <Route path="/dashboard/timetables">
              <TimeTable />
            </Route>
            <Route path="/dashboard/start-processing">
              <StartProcessing />
            </Route>
            <Route path="/dashboard/timetable-bells">
              <TimeTableBells />
            </Route>
            <Route path="/dashboard/delete-timetabelbell">
              <DeleteTimeTableBells />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default AdminRoutes;
