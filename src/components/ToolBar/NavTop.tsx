import {ThemeCustom} from '@/components/Theme/Theme';
import to from '@/components/Utils/to';
import * as animation from '@/store/actions/animationTypes';
import {ReducersList} from '@/store/reducers';
import {AnimationState, AnimationAction} from '@/store/reducers/Visual/global-animation';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import blue from '@material-ui/core/colors/blue';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import React, {Fragment, FunctionComponent, MouseEvent, useRef, useState} from 'react';
import {withCookies} from 'react-cookie';
import Loadable from 'react-loadable';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import Cookies from 'universal-cookie';
import Hidden from '@material-ui/core/Hidden/Hidden';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {Menu} from '@material-ui/icons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {ISideDrawerProps} from '@/components/ToolBar/SideDrawer';
import Logo from '@/components/ToolBar/Logo';
import People from '@material-ui/icons/People';
import PowerSettingsNewRounded from '@material-ui/icons/PowerSettingsNewRounded';
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";

interface IProps {
  classes: any,
}

interface ILocalProps extends IProps {
  animation: AnimationState;
  cookies: Cookies

  handleLoginButton(status: boolean): void
  handleSignUpAnimation(status: boolean): void
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: '20px',
  },
  button: {
    height: theme!.palette!.button.nav,
    borderRadius: '0px',
    '&:hover': {},
  },
  link: {
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0)',
      color: blue[500],
    },
  },
  menuButton: {
    marginLeft: -28,
    marginRight: 20,
  },
  drawer: {
    [theme!.breakpoints!.only!('xs')]: {
      width: '80%',
    },
    width: '60%',
  },
  Popper: {
    zIndex: 9999
  }
});

const LoginForm = Loadable({
  loader: (): Promise<any> => import('@/components/Forms/LoginForm'),
  loading: () => {
    return null;
  },
});

const SignUpForm = Loadable({
  loader: (): Promise<any> => import('@/components/Forms/RegisterForm'),
  loading: () => null,
});

const SideDrawer = Loadable<ISideDrawerProps, any>({
  loader: () => import('@/components/ToolBar/SideDrawer'),
  loading: () => null,
});

// @ts-ignore
const NavTop: FunctionComponent<IProps> = (props: ILocalProps) => {
  const {
          classes,
          cookies,
        } = props;

  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const userRefButton = useRef(null);

  const closeMenu = () => {
    setMenuStatus(false);
  };

  const logoutTrigger = () => {
    window.location.reload();
    cookies.remove('_token', {
      path: '/',
    });
  };

  const loginButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleLoginButton(true);
  };

  const signUpButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleSignUpAnimation(true);
  };

  return (
    <Fragment>
      <AppBar position = 'static' color = 'secondary'>
        <Toolbar>
          <Hidden smDown>
            <Logo />
            <div className = {classes.grow}>

            </div>
            <Button
              href = 'https://merchant.westay.org'
              color = 'inherit'
              className = {classes.button}
              name = 'merchant-site'
            >
              Dành cho chủ nhà
            </Button>
            <Button
              name = 'support'
              color = 'inherit'
              className = {classes.button}>
              Trợ giúp
            </Button>
            {cookies.get('_token')
              ? <Fragment>
                <Button
                  name = 'avatar'
                  buttonRef = {userRefButton}
                  color = 'inherit'
                  className = {classes.button}
                  onClick = {() => setMenuStatus(!menuStatus)}
                  style = {{backgroundColor: 'transparent'}}
                ><Avatar><People /></Avatar>
                </Button>
                <Popper open = {menuStatus} anchorEl = {userRefButton.current} transition className = {classes.Popper}>
                  {({TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      style = {{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        minWidth: 300,
                      }}
                    >
                      <Paper elevation = {1}>
                        <ClickAwayListener onClickAway = {closeMenu}>
                          <MenuList>
                            <MenuItem
                              name = 'profile'
                              onClick = {closeMenu}
                              {...to('/profile')}>
                              <ListItemIcon>
                                <AccountCircleOutlined />
                              </ListItemIcon>
                              Thông tin cá nhân
                            </MenuItem>
                            <Divider />
                            <MenuItem name = 'sign-out' onClick = {logoutTrigger}>
                              <ListItemIcon>
                                <PowerSettingsNewRounded />
                              </ListItemIcon>
                              Đăng xuất
                            </MenuItem>
                            {/*<Divider />*/}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Fragment>
              : <Fragment>
                <Button
                  name = 'sign-in'
                  color = 'inherit'
                  className = {classes.button}
                  onClick = {loginButtonClick}
                  onMouseOver = {() => LoginForm.preload()}
                >Đăng nhập</Button>
                <Button
                  name = 'sign-up'
                  color = 'inherit'
                  className = {classes.button}
                  onClick = {signUpButtonClick}
                  onMouseOver = {() => SignUpForm.preload()}
                >Đăng ký</Button>
              </Fragment>
            }
          </Hidden>
          <Hidden mdUp>
            <div className = {classes.grow}>
              <IconButton className = {classes.menuButton} onClick = {() => setOpenDrawer(!openDrawer)}>
                <Menu />
                <SwipeableDrawer
                  disableSwipeToOpen
                  open = {openDrawer}
                  onOpen = {() => setOpenDrawer(true)}
                  onClose = {() => setOpenDrawer(false)}
                  ModalProps = {{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  classes = {{
                    paper: classes.drawer,
                  }}
                >
                  <SideDrawer setOpen = {setOpenDrawer} />
                </SwipeableDrawer>
              </IconButton>
            </div>
            <Logo />
          </Hidden>
        </Toolbar>
      </AppBar>
      {props.animation.isLoginFormOpen && <LoginForm />}
      {props.animation.isSignUpFormOpen && <SignUpForm />}
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnimationAction>) => {
  return {
    handleLoginButton: (status: boolean) => dispatch({
      type: animation.LOGIN_BUTTON_CLICK,
      status: status,
    }),
    handleSignUpAnimation: (status: boolean) => dispatch({
      type: animation.SIGN_UP_BUTTON_CLICK,
      status: status,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withCookies,
  withStyles(styles),
)(NavTop);
