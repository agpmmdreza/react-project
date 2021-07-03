import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import AuthContext from "../store/auth-context";
import clsx from "clsx";
const GetDays = React.lazy(() =>
  import("../components/RouteComponents/Days/GetDays")
);
const GetBells = React.lazy(() =>
  import("../components/RouteComponents/Bells/GetBells")
);
const GetAnnouns = React.lazy(() =>
  import("../components/RouteComponents/Announcements/GetAnnouns")
);
const AddAnnoun = React.lazy(() =>
  import("../components/RouteComponents/Announcements/AddAnnoun")
);
const DeleteAnnoun = React.lazy(() =>
  import("../components/RouteComponents/Announcements/DeleteAnnoun")
);
const CourseTimeTable = React.lazy(() =>
  import("../components/RouteComponents/Courses/CourseTimeTable")
);
const CourseMasters = React.lazy(() =>
  import("../components/RouteComponents/Courses/CourseMasters")
);
const TimeTable = React.lazy(() =>
  import("../components/RouteComponents/TimeTables/TimeTable")
);
const TimeTableBells = React.lazy(() =>
  import("../components/RouteComponents/TimeTableBells/TimeTableBells")
);
const DeleteTimeTableBells = React.lazy(() =>
  import("../components/RouteComponents/TimeTableBells/DeleteTimeTableBells")
);
const AddTimeTableBell = React.lazy(() =>
  import("../components/RouteComponents/TimeTableBells/AddTimeTableBell")
);
const Profile = React.lazy(() => import("../components/UI/Profile"));
const EditProfile = React.lazy(() => import("../components/UI/EditProfile"));
const ChangePass = React.lazy(() => import("../components/UI/ChangePass"));
const GetCourses = React.lazy(() =>
  import("../components/RouteComponents/Courses/GetCourses")
);
const ChooseCourse = React.lazy(() =>
  import("../components/RouteComponents/Courses/ChooseCourse")
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

const MasterRoutes = () => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  return (
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
          <Route path="/dashboard/bells">
            <GetBells />
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
          <Route path="/dashboard/course-timetables">
            <CourseTimeTable />
          </Route>
          <Route path="/dashboard/courses">
            <GetCourses />
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
          <Route path="/dashboard/timetable-bells">
            <TimeTableBells />
          </Route>
          <Route path="/dashboard/delete-timetabelbell">
            <DeleteTimeTableBells />
          </Route>
          <Route path="/dashboard/add-timetablebell">
            <AddTimeTableBell />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default MasterRoutes;
