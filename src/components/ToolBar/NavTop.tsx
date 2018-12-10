import {ThemeCustom} from '@/components/Theme/Theme';
import to from '@/components/Utils/to';
import * as animation from '@/store/actions/animationTypes';
import {ReducersType, ReducersList} from '@/store/reducers';
import {AnimationState as AnimationState, AnimationAction as AnimationAction} from '@/store/reducers/Visual/global-animation';
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
import Typography from '@material-ui/core/Typography';
import React, {Fragment, FunctionComponent, MouseEvent, useRef, useState} from 'react';
import {withCookies} from 'react-cookie';
import Loadable from 'react-loadable';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import Cookies from 'universal-cookie';

interface IProps {
  classes: any,
  cookies: Cookies
}

interface ILocalProps extends IProps {
  animation: AnimationState;

  handleLoginButton(status: boolean): void;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: '20px',
  },
  middle: {
    flexGrow: 5,
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
});

const LoginForm = Loadable({
  loader: (): Promise<any> => import('@/components/Forms/LoginForm'),
  loading: () => {
    return null;
  },
});

// @ts-ignore
const NavTop: FunctionComponent<IProps> = (props: ILocalProps) => {
  const {
          classes,
          cookies,
        } = props;

  const userRefButton               = useRef(null);
  const [menuStatus, setMenuStatus] = useState<boolean>(false);

  const closeMenu = () => {
    setMenuStatus(false);
  };

  const logoutTrigger = () => {
    cookies.remove('_token', {
      path: '/',
    });
    setMenuStatus(false);
  };

  const loginButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleLoginButton(true);
  };

  return (
    <Fragment>
      <AppBar position = 'static' color = 'secondary'>
        <Toolbar>
          <Button {...to('/')}>
            <Typography variant = 'h6' color = 'inherit'>
              LOGO
            </Typography>
          </Button>
          <div className = {classes.grow}>
            <Button color = 'inherit' className = {classes.link}>Rooms</Button>
            <Button color = 'inherit' className = {classes.link}>About us</Button>
            <Button color = 'inherit' className = {classes.link}>Become a host</Button>
          </div>
          <Button color = 'inherit'
                  {...to('/payments/book')}
                  className = {classes.button}>
            Help
          </Button>
          {cookies.get('_token')
            ? <Fragment>
              <Button
                buttonRef = {userRefButton}
                color = 'inherit'
                className = {classes.button}
                onClick = {() => setMenuStatus(!menuStatus)}
                style = {{backgroundColor: 'transparent'}}
              ><Avatar>HR</Avatar></Button>
              <Popper open = {menuStatus} anchorEl = {userRefButton.current} transition>
                {({TransitionProps, placement}) => (
                  <Grow
                    {...TransitionProps}
                    style = {{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                      minWidth: 300,
                    }}
                  >
                    <Paper square elevation = {1}>
                      <ClickAwayListener onClickAway = {closeMenu}>
                        <MenuList>
                          <MenuItem onClick = {closeMenu}>Edit Profile</MenuItem>
                          <Divider />
                          <MenuItem onClick = {closeMenu}>Account Settings</MenuItem>
                          <Divider />
                          <MenuItem onClick = {closeMenu}>My Guidebook</MenuItem>
                          <Divider />
                          <MenuItem onClick = {logoutTrigger}>Logout</MenuItem>
                          <Divider />
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Fragment>
            : <Fragment>
              <Button color = 'inherit' className = {classes.button}
                      onClick = {loginButtonClick}
                      onMouseOver = {() => null}>Log in</Button>
              <Button color = 'inherit' className = {classes.button}>Register</Button>
            </Fragment>
          }
        </Toolbar>
      </AppBar>
      {props.animation.isLoginFormOpen && <LoginForm />}
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
    /**
     * Toggle Login Form
     * @param {boolean} status
     * @returns {{type: string; status: boolean}}
     */
    handleLoginButton: (status: boolean) => dispatch({
      type: animation.LOGIN_BUTTON_CLICK,
      status: status,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withCookies,
  withStyles(styles),
)(NavTop);
