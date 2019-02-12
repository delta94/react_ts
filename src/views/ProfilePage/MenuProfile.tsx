import BG from '@/assets/avatar_demo.jpg';
import verifiedMail from '@/assets/verified.png';
import InformationOfHomestay from '@/components/IntroHomestay/InformationOfHomestay';
import GridContainer from '@/layouts/Grid/Container';
import BookingProfile from '@/views/ProfilePage/BookingProfile';
import EditProfile from '@/views/ProfilePage/EditProfile';
import HomeSweetHome from '@/views/ProfilePage/HomeSweetHome';
import RewardsProfile from '@/views/ProfilePage/RewardsProfile';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Bookmarks from '@material-ui/icons/BookmarksOutlined';
import CardGift from '@material-ui/icons/CardGiftcardOutlined';
import Favorite from '@material-ui/icons/FavoriteBorder';
import Person from '@material-ui/icons/PersonOutlined';
import Weekend from '@material-ui/icons/WeekendOutlined';
import PhotoCamera from '@material-ui/icons/PhotoCameraOutlined';
import React, {ChangeEvent, ComponentType, Fragment, useState, useContext} from 'react';
import {compose} from 'recompose';
import Grow from '@material-ui/core/Grow';
import {ThemeCustom} from '@/components/Theme/Theme';
import {IProfileContext, ProfileContext} from '@/store/context/Profile/ProfileContext';
import {GlobalContext, IGlobalContext} from "@/store/context/GlobalContext";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {Hidden} from "@material-ui/core";
import ReviewRoom from '@/views/ProfilePage/ReviewRoom';

const styles: any = (theme: ThemeCustom) => createStyles({
  bg_menu: {
    maxHeight: 350,
    height: 330,
    width: '100%',
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    filter: 'blur(3px)',
    WebkitFilter: 'blur(3px)',
  },
  box_avatar: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  avatar: {
    marginTop: 10,
    position: 'relative',
    borderRadius: '50%',
    width: 200,
    height: 200,
    display: 'inline-block',
    overflow: 'hidden',
  },
  imgAvatar: {
    width: '100%',
    height: 'inherit',
    objectFit: 'cover',
  },
  uploadAvatar: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    color: 'white',
    padding: '5px 0',
  },
  verifiedMail: {
    width: 17,
    height: 17,
    display: 'inline-block',
    paddingLeft: 10,
    overflow: 'unset',
    position: 'absolute',
    fontSize: 0,
  },
  menuProfile: {
    marginTop: '-40px',
    position: 'relative',
    zIndex: 1,
  },
  tabMenu: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    marginBottom: 10,
  },
  btUpload: {
    cursor: 'pointer',
  },
  NaviBottom: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: '0px 1px 5px 2px rgba(0,0,0,0.2)',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    justifyContent: 'flex-start'
  }
});

interface ITabContainer {
  children: any
}

interface IMenuProfile {
  classes?: any
}

const TabContainer: ComponentType<ITabContainer> = (props: ITabContainer) => {
  return (
    <GridContainer xs = {12} sm = {12} md = {11} lg = {10}>
      {props.children}
    </GridContainer>
  );
};

const MenuProfile: ComponentType<IMenuProfile> = (props: IMenuProfile) => {
  const {classes} = props;
  const {width} = useContext<IGlobalContext>(GlobalContext);
  const [value, setValue] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const {state, dispatch} = useContext<IProfileContext>(ProfileContext);

  const {profile} = state;

  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };
  console.log(profile);
  return (
    <Fragment>
      <div style = {{position: 'relative'}}>
        <div className = {classes.bg_menu}></div>
        <div className = {classes.box_avatar}>
          <div className = {classes.avatar} onMouseEnter = {() => setShow(!show)}
               onMouseLeave = {() => setShow(false)}>
            <img alt = 'Avatar' src = {BG} className = {classes.imgAvatar} />
            <Grow in = {show} timeout = {{enter: 300, exit: 200}}>
              <div className = {classes.uploadAvatar}>
                <label className = {classes.btUpload}>
                  <input type = 'file' accept = 'image/png, image/jpeg' hidden />
                  <PhotoCamera />
                  <Typography variant = {'subtitle2'} color = 'inherit'>Upload Avatar</Typography>
                </label>
              </div>
            </Grow>
          </div>
          <Typography variant = 'h6' color = 'inherit'>{profile ? profile!.name : ''}</Typography>
          <Typography variant = 'body2' color = 'inherit'>
            {profile ? profile!.email : ''}
            <img alt = 'Avatar' src = {verifiedMail} className = {classes.verifiedMail} />
          </Typography>
        </div>
      </div>
      <div className = {classes.menuProfile}>
        <GridContainer xs = {12} sm = {12} md = {11} lg = {10}>
          <Grid container>
            <Hidden xsDown>
              <AppBar position = 'static' className = {classes.tabMenu}>
                <Tabs value = {value} onChange = {handleChange} variant = {width == 'xs' ? "scrollable" : "fullWidth"}
                      indicatorColor = 'primary' textColor = 'primary' scrollButtons = 'off'>
                  <Tab icon = {<Person />} label = 'Thông tin cá nhân' />
                  <Tab icon = {<Bookmarks />} label = 'Danh sách đặt phòng' />
                  <Tab icon = {<Favorite />} label = 'Danh sách yêu thích' />
                  <Tab icon = {<CardGift />} label = 'Điểm thưởng' />
                  <Tab icon = {<Weekend />} label = 'Thiết lập' />
                  <Tab icon = {<Weekend />} label = 'Độc nhĩ' />
                </Tabs>
              </AppBar>
            </Hidden>
            <Hidden smUp>
              <BottomNavigation value = {value} onChange = {handleChange} className = {classes.NaviBottom}>
                <BottomNavigationAction label = 'Hồ sơ' value = {0} icon = {<Person />} />
                <BottomNavigationAction label = 'Bookings' value = {1} icon = {<Bookmarks />} />
                <BottomNavigationAction label = 'Yêu thích' value = {2} icon = {<Favorite />} />
                <BottomNavigationAction label = 'Điểm thưởng' value = {3} icon = {<CardGift />} />
                <BottomNavigationAction label = 'Thiết lập' value = {4} icon = {<Weekend />} />
              </BottomNavigation>
            </Hidden>
          </Grid>
        </GridContainer>
      </div>
      <div>
        {value === 0 && <TabContainer> <EditProfile />
        </TabContainer>}
      </div>
      <div>
        {value === 1 && <TabContainer> <BookingProfile />
        </TabContainer>}
      </div>
      <div>
        {value === 2 && <TabContainer> <InformationOfHomestay />
        </TabContainer>}
      </div>
      <div>
        {value === 3 && <TabContainer> <RewardsProfile />
        </TabContainer>}
      </div>
      <div>
        {value === 4 && <TabContainer> <HomeSweetHome />
        </TabContainer>}
      </div>
      <div>
        {value === 5 && <TabContainer> <ReviewRoom/>
        </TabContainer>}
      </div>
    </Fragment>
  );
};
export default compose<IMenuProfile, any>(
  withStyles(styles),
)(MenuProfile);


