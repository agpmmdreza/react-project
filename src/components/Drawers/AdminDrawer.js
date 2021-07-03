import {
  AccountBox,
  AutorenewRounded,
  BookRounded,
  DateRange,
  DeleteRounded,
  ExpandLess,
  ExpandMore,
  GroupAddRounded,
  HourglassEmptyRounded,
  ListAltRounded,
  NotificationsActive,
  PersonAddRounded,
  PostAddRounded,
  QueryBuilder,
  QueueRounded,
  RecentActorsRounded,
  TableChartRounded,
  UpdateRounded,
  WatchLaterRounded,
} from '@material-ui/icons';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const adminDrawerList = [
  {
    name: 'Users ',
    icon: <AccountBox />,
    children: [
      {
        name: 'Users List',
        path: '/dashboard/user-list',
        icon: <ListAltRounded />,
      },
      {
        name: 'Add User',
        path: '/dashboard/add-user',
        icon: <PersonAddRounded />,
      },
      {
        name: 'Delete User',
        path: '/dashboard/delete-user',
        icon: <DeleteRounded />,
      },
      {
        name: 'Update User',
        path: '/dashboard/update-user',
        icon: <AutorenewRounded />,
      },
      {
        name: 'Add User Group',
        path: '/dashboard/add-user-group',
        icon: <GroupAddRounded />,
      },
    ],
  },
  {
    name: 'Days',
    icon: <DateRange />,
    children: [
      {
        name: 'Get Days',
        path: '/dashboard/days',
        icon: <ListAltRounded />,
      },
      {
        name: 'Add Day',
        path: '/dashboard/add-day',
        icon: <PostAddRounded />,
      },
      {
        name: 'Delete Day',
        path: '/dashboard/delete-day',
        icon: <DeleteRounded />,
      },
      {
        name: 'Update Day',
        path: '/dashboard/update-day',
        icon: <AutorenewRounded />,
      },
    ],
  },
  {
    name: 'Bells',
    icon: <QueryBuilder />,
    children: [
      {
        name: 'Get Bells',
        path: '/dashboard/bells',
        icon: <ListAltRounded />,
      },
      {
        name: 'Add Bells',
        path: '/dashboard/add-bells',
        icon: <QueueRounded />,
      },
      {
        name: 'Delete Bells',
        path: '/dashboard/delete-bells',
        icon: <DeleteRounded />,
      },
      {
        name: 'Update Bells',
        path: '/dashboard/update-bells',
        icon: <UpdateRounded />,
      },
    ],
  },
  {
    name: 'Announcements',
    icon: <NotificationsActive />,
    children: [
      {
        name: 'Get Announcements',
        path: '/dashboard/announ',
        icon: <ListAltRounded />,
      },
      {
        name: 'Add Announcements',
        path: '/dashboard/add-announ',
        icon: <QueueRounded />,
      },
      {
        name: 'Delete Announcements',
        path: '/dashboard/delete-announ',
        icon: <DeleteRounded />,
      },
    ],
  },
  {
    name: 'Courses',
    icon: <BookRounded />,
    children: [
      {
        name: 'Get Courses',
        path: '/dashboard/courses',
        icon: <ListAltRounded />,
      },
      {
        name: 'Add Courses',
        path: '/dashboard/add-course',
        icon: <QueueRounded />,
      },
      {
        name: 'Delete Courses',
        path: '/dashboard/delete-course',
        icon: <DeleteRounded />,
      },
      {
        name: 'Update Course',
        path: '/dashboard/update-course',
        icon: <UpdateRounded />,
      },
      {
        name: 'Course Time Tables',
        path: '/dashboard/course-timetables',
        icon: <TableChartRounded />,
      },
      {
        name: 'Course Masters',
        path: '/dashboard/course-masters',
        icon: <RecentActorsRounded />,
      },
    ],
  },
  {
    name: 'Time Tables',
    icon: <WatchLaterRounded />,
    children: [
      {
        name: 'Get Time Tables',
        path: '/dashboard/timetables',
        icon: <ListAltRounded />,
      },
      {
        name: 'Start Processing',
        path: '/dashboard/start-processing',
        icon: <HourglassEmptyRounded />,
      },
    ],
  },
  {
    name: 'Time Table Bells',
    icon: <TableChartRounded />,
    children: [
      {
        name: 'Get Time Table Bells',
        path: '/dashboard/timetable-bells',
        icon: <ListAltRounded />,
      },
      {
        name: 'Delete Time Table Bell',
        path: '/dashboard/delete-timetabelbell',
        icon: <DeleteRounded />,
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const INIT_OPEN = [
  { index: 0, open: false },
  { index: 1, open: false },
  { index: 2, open: false },
  { index: 3, open: false },
  { index: 4, open: false },
  { index: 5, open: false },
  { index: 6, open: false },
  { index: 7, open: false },
];

export const AdminDrawer = () => {
  const [collapses, setCollapses] = useState(INIT_OPEN);
  const classes = useStyles();
  const handleClick = (index) => {
    setCollapses((prevState) =>
      prevState.map((item) =>
        item.index === index ? { ...item, open: !item.open } : item
      )
    );
  };

  return (
    <List>
      {adminDrawerList.map((item, index) => {
        if ('children' in item) {
          const selectedItem = collapses.find((item) => item.index === index);
          return (
            <Fragment key={item.name}>
              <ListItem button onClick={() => handleClick(index)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                {selectedItem.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={selectedItem.open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.children.map((child) => (
                    <ListItem
                      button
                      component={Link}
                      to={child.path}
                      className={classes.nested}
                      key={child.name}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Fragment>
          );
        } else {
          return (
            <ListItem component={Link} to={item.path} button key={item.name}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        }
      })}
    </List>
  );
};
