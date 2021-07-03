import {
  DateRange,
  ExpandLess,
  ExpandMore,
  ListAltRounded,
  NotificationsActive,
  QueryBuilder,
  UpdateRounded,
} from '@material-ui/icons';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const studentDrawerList = [
  {
    name: 'Days',
    icon: <DateRange />,
    children: [
      {
        name: 'Get Days',
        path: '/dashboard/days',
        icon: <ListAltRounded />,
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
    ],
  },
  {
    name: 'Courses',
    icon: <NotificationsActive />,
    children: [
      {
        name: 'Course Time Tables',
        path: '/dashboard/course-timetables',
        icon: <UpdateRounded />,
      },
      {
        name: 'Course Masters',
        path: '/dashboard/course-masters',
        icon: <UpdateRounded />,
      },
    ],
  },
  {
    name: 'Time Tables',
    icon: <NotificationsActive />,
    children: [
      {
        name: 'Get Time Tables',
        path: '/dashboard/timetables',
        icon: <ListAltRounded />,
      },
      {
        name: 'Choose Time Tables',
        path: '/dashboard/choose-timetables',
        icon: <ListAltRounded />,
      },
    ],
  },
];

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

export const StudentDrawer = () => {
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
      {studentDrawerList.map((item, index) => {
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
