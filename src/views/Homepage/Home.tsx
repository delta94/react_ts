import React, {Fragment, FunctionComponent} from 'react';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import {compose} from 'recompose';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import SearchHome from '@/layouts/Main/SearchHome';
import Grid from '@material-ui/core/Grid';
import useFocusTitle from '@/utils/focusState';
import BG from '@/assets/adult-adventure-backlit-915972.jpg';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-homepage.scss';
import Footer from '@/layouts/Main/Footer';
import ListRoom from '@/layouts/Main/ListRoom';

interface IProps {
  classes?: any;
}

const styles = (theme: Theme) => createStyles({
  panel: {
    height: '60rem',
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  panelBody: {
    marginTop: '25px',
  },
});

const Home: FunctionComponent<IProps | any> = props => {
  const {classes} = props;
  useFocusTitle(document.title, 'Booking now!!');

  return (
    <Fragment>
      <NavTop />
      <div className = {classes.panel}>
        <GridContainer xs = {11}>
          <Grid container spacing = {24} className = {classes.panelBody}>
            <SearchHome />
            {/*<Promotion/>*/}
          </Grid>
        </GridContainer>
      </div>
      <ListRoom />
      <Footer />
    </Fragment>
  );
};

export default compose(
  withStyles(styles),
)(Home);
