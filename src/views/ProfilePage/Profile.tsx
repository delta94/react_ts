import React, {ComponentType, useReducer, useEffect} from 'react';
import MenuProfile from '@/views/ProfilePage/MenuProfile';
import NavTop from '@/components/ToolBar/NavTop';
import {compose} from 'recompose';
import {createStyles, withStyles} from '@material-ui/core';
import {ThemeCustom} from '@/components/Theme/Theme';
import {
  ProfileState,
  ProfileAction,
  ProfileReducer,
  ProfileStateInit,
  getDataProfile,
  ProfileContext,
} from '@/store/context/Profile/ProfileContext';

interface IProps {
  classes: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  bgColor: {
    backgroundColor: '#F8F7F9',
  },
});

const Profile: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [state, dispatch] = useReducer<ProfileState, ProfileAction>(ProfileReducer, ProfileStateInit);

  useEffect(() => {
    getDataProfile(dispatch);
  }, []);

  return (
    <ProfileContext.Provider value = {{state, dispatch}}>
      <div className = {classes.bgColor}>
        <NavTop />
        <MenuProfile />
      </div>
    </ProfileContext.Provider>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Profile);
