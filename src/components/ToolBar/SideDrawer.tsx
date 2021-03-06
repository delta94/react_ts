import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, Dispatch, memo} from 'react';
import {compose} from 'recompose';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import {AccountCircle, Home} from '@material-ui/icons';
import {AccountQuestion} from 'mdi-material-ui';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import BG from '@/assets/adult-adventure-backlit-915972.jpg';
import {ReducersList} from '@/store/reducers';
import {AnimationAction} from '@/store/reducers/Visual/global-animation';
import * as animation from '@/store/actions/animationTypes';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import Cookies from 'universal-cookie';
import to from '@/components/Utils/to';

export interface ISideDrawerProps {
  classes?: any
  setOpen(value: boolean): void
}

interface ILocalProps extends ISideDrawerProps {
  cookies: Cookies

  handleLoginButton(status: boolean): void;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  img: {
    width: '100%',
    backgroundPosition: 'center',
    maxHeight: 200,
    backgroundSize: 'cover',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  signOut: {
    position: 'absolute',
    right: '5%',
  },
  text: {
    [theme!.breakpoints!.only!('xs')]: {
      fontSize: '0.8rem'
    }
  }
});

// @ts-ignore
const SideDrawer: ComponentType<ISideDrawerProps> = (props: ILocalProps) => {
  const {classes, handleLoginButton, setOpen, cookies} = props;

  const isLogin = !!(cookies.get('_token'));

  const logoutTrigger = () => {
    cookies.remove('_token', {
      path: '/',
    });
  };

  return (
    <Fragment>
      <img src = {BG} className = {classes.img} />
      <List>
        <ListItem>
          <Typography variant = 'subtitle2'>Tài khoản</Typography>
          {isLogin ? (
            <Typography
              variant = 'subtitle2'
              onClick={logoutTrigger}
              className = {classes.signOut}
            >Đăng xuất</Typography>
          ) : ''}
        </ListItem>
        <ListItem button {...to('/')} onClick = {() => setOpen(false)}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary = 'Đặt phòng' classes={{
            primary: classes.text
          }} />
        </ListItem>
        {isLogin ? (
          <Fragment>
            <ListItem button {...to('/profile')}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary = 'Thông tin cá nhân' classes={{
                primary: classes.text
              }}/>
            </ListItem>
          </Fragment>
        ) : (
          <ListItem button onClick = {() => {
            setOpen(false);
            handleLoginButton(true);
          }}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary = 'Đăng nhập / Đăng ký' classes={{
              primary: classes.text
            }}/>
          </ListItem>
        )}
        <Divider />
        <ListItem button>
          <ListItemIcon><AccountQuestion /></ListItemIcon>
          <ListItemText primary = 'Trợ giúp' classes={{
            primary: classes.text
          }}/>
        </ListItem>
      </List>
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

export default compose<ISideDrawerProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withCookies,
  withStyles(styles),
  memo
)(SideDrawer);
