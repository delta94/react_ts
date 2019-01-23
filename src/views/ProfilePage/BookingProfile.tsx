import React, {ChangeEvent, ComponentType, Fragment, useContext, useState} from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import BookingList from '@/views/ProfilePage/BookingList';
import NoteOutlined from '@material-ui/icons/NoteOutlined';


import {ThemeCustom} from '@/components/Theme/Theme';
import {Typography} from "@material-ui/core";
import {GlobalContext, IGlobalContext} from "@/store/context/GlobalContext";

const styles: any = (theme: ThemeCustom) => createStyles({
  boxBookingProfile: {
    position: 'relative',
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography!.fontWeightRegular,
    marginRight: theme.spacing!.unit! * 4,
    fontFamily: [
      '-apple-system',
      'Roboto',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography!.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  myBooking: {
    paddingTop: 20,
    width: '90%',
    margin: '0 auto',
  },
  fakeData: {
    position: 'absolute',
    width: '100%',
    paddingTop: 50,
    zIndex: -1,
    left: '50%',
    top: '50%',
    WebkitTransform: 'translateX(-50%) translateY(0)',
    MozTransform: 'translateX(-50%) translateY(0)',
    transform: 'translateX(-50%) translateY(0)',
  },
  iconNote: {
    fontSize: 32,
  }
});

interface ITabContainer {
  children: any
}

interface IBookingProfile {
  classes?: any;
}

const TabContainer: ComponentType<ITabContainer> = (props: ITabContainer) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
};

const BookingProfile: ComponentType<IBookingProfile> = (props: IBookingProfile) => {
  const {classes} = props;
  const [value, setValue] = useState<number>(1);
  const {width} = useContext<IGlobalContext>(GlobalContext);

  const handleChange = (event: ChangeEvent<{}>, values: number) => {
    setValue(values);
  };

  return (
    <Fragment>
      <Paper square style = {{position: 'relative'}}>
        <Tabs
          value = {value}
          onChange = {handleChange}
          classes = {{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
          variant = {width == 'xs' ? "scrollable" : "fullWidth"}
          scrollButtons = 'auto'
        >
          <Tab
            disableRipple
            classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
            label = 'Pending'
          />
          <Tab
            disableRipple
            classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
            label = 'Upcoming'
          />
          <Tab
            disableRipple
            classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
            label = 'Completed'
          />
          <Tab
            disableRipple
            classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
            label = 'Cancelled'
          />

        </Tabs>
        <div>
          {value === 0 && <TabContainer> <BookingList status = {1} />
          </TabContainer>}
        </div>
        <div>
          {value === 1 && <TabContainer> <BookingList status = {2} />
          </TabContainer>}
        </div>
        <div>
          {value === 2 && <TabContainer> <BookingList status = {4} />
          </TabContainer>}
        </div>
        <div>
          {value === 3 && <TabContainer> <BookingList status = {5} />
          </TabContainer>}
        </div>
        <div className = {classes.fakeData}>
          <Typography align = 'center' variant = 'h4' color = 'textSecondary'>
            <NoteOutlined className = {classes.iconNote} />
          </Typography>
          <Typography align = 'center' variant = 'h4' color = 'textSecondary'>
            Nothing in your list
          </Typography>
        </div>
      </Paper>

    </Fragment>
  );
};

export default compose<IBookingProfile, any>(
  withStyles(styles)
)(BookingProfile);
