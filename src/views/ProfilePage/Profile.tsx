import React, {ComponentType} from 'react';
import MenuProfile from '@/views/ProfilePage/MenuProfile';
import NavTop from '@/components/ToolBar/NavTop';
import {compose} from 'recompose';
import {createStyles, withStyles} from '@material-ui/core';
import {ThemeCustom} from '@/components/Theme/Theme';

interface IProps {
    classes: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  bgColor:{
    backgroundColor:'#F8F7F9',
  },
});

const Profile: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
      <div className={classes.bgColor}>
        <NavTop/>
        <MenuProfile/>
      </div>
  );
};

export default compose<IProps, any>(
    withStyles(styles),
)(Profile)
