import React, { FC } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Settings from '@material-ui/icons/Settings';
import Business from '@material-ui/icons/Business';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Today from '@material-ui/icons/Today';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import { Snackbar } from '@material-ui/core';
import { MenuType } from '../../containers/HomeContainer/HomeContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 999,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),

      background: '#333333',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

      background: '#333333',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      background: '#333333',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      '& .MuiSvgIcon-root': {
        color: '#FFF',
      },
    },
    sidemenu: {
      '& .MuiListItemText-root': {
        color: '#FFF',
      },
      '& .MuiListItemText-root:hover': {
        color: '#FE9000',
      },
      '& .MuiSvgIcon-root': {
        color: '#FFF',
      },
      '& .MuiSvgIcon-root:hover': {
        color: '#FE9000',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      background: '#222831',
    },
  }),
);

type Props = {
  handleOnClickMenu: (value: MenuType) => void;
  children: JSX.Element[] | JSX.Element;
};

const Home: FC<Props> = ({ handleOnClickMenu, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Work
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} color={'inherit'}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.sidemenu}>
          <ListItem
            button
            key={'attendance'}
            onClick={() => handleOnClickMenu('attendance')}
          >
            <ListItemIcon>
              <PermContactCalendar />
            </ListItemIcon>
            <ListItemText primary={'勤務データ'} />
          </ListItem>
          <ListItem
            button
            key={'userSetting'}
            onClick={() => handleOnClickMenu('userSetting')}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={'各種設定'} />
          </ListItem>
        </List>
        <Divider style={{ background: '#fff' }} />
        <List className={classes.sidemenu}>
          <ListItem
            button
            key={'user'}
            onClick={() => handleOnClickMenu('user')}
          >
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary={'ユーザー'} />
          </ListItem>
          <ListItem
            button
            key={'adminSetting'}
            onClick={() => handleOnClickMenu('adminSetting')}
          >
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary={'各種設定'} />
          </ListItem>
          <ListItem
            button
            key={'attendanceSetting'}
            onClick={() => handleOnClickMenu('attendanceSetting')}
          >
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText primary={'勤怠データ設定'} />
          </ListItem>
          {/* {['ユーザー', '会社設定', '勤怠データ設定'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <PeopleAlt />
                ) : index === 1 ? (
                  <Business />
                ) : (
                  <Today />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Home;
