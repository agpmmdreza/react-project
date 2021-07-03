import {
  BookRounded,
  DateRange,
  DeleteRounded,
  ExpandLess,
  ExpandMore,
  ListAltRounded,
  NotificationsActive,
  QueryBuilder,
  QueueRounded,
  RecentActorsRounded,
  TableChartRounded,
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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const masterDrawerList = [
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
        name: 'Course Time Tables',
        path: '/dashboard/course-timetables',
        icon: <TableChartRounded />,
      },
      {
        name: 'Course Masters',
        path: '/dashboard/course-masters',
        icon: <RecentActorsRounded />,
      },
      {
        name: 'Choose a Course',
        path: '/dashboard/choose-course',
        icon: <BookRounded />,
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
    ],
  },
  {
    name: 'Time Table Bells',
    icon: <TableChartRounded />,
    children: [
      {
        name: 'Add Time Table Bells',
        path: '/dashboard/add-timetablebell',
        icon: <QueueRounded />,
      },
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

export const MasterDrawer = () => {
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
    <Fragment>
      <List>
        {masterDrawerList.map((item, index) => {
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
    </Fragment>
  );
};
