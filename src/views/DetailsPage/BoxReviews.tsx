import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import LocationHomeMap from "@/views/DetailsPage/LocationHomeMap";
import React, {ComponentType, Fragment, useState} from 'react';
import {compose,withProps} from 'recompose';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar";
import avatarDemo from '@/assets/avatar_demo.jpg';

// @ts-ignore
import StarRatings from 'react-star-ratings';
// @ts-ignore
import Pagination from 'rc-pagination';
// @ts-ignore
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
// @ts-ignore
import GoogleMapReact from 'google-map-react';

interface IProps {
  classes?: any,
  center?: Object,
  zoom?: number,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  rowMargin: {
    margin: '20px 0',
    padding: '12px 24px',
    borderTop: '1px solid #e0e0e0',
  },
  rowMarginBorderTop:{
    margin: '10px 0',
    borderTop: '1px solid #e0e0e0',
    padding: '15px 0px',
  },
  rowMargin2: {
    margin: '10px 0',
  },
  titleHighlight: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: '#484848',
  },
  boxMark: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 80,
    width: 80,
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
    border: 'double 9px transparent',
    backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #61c69d,#91BDE6 )',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  Mark: {
    backgroundColor: '#1ba0e2',
    backgroundImage: 'linear-gradient(to bottom, #bdbdbd, #7ebdc2)',
    borderRadius: '50%',
    width: '90%',
    height: '90%',
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    MozTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  TypoMark: {
    color: '#fff',
    fontSize: '2.5vw',
    fontWeight: 500,
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    MozTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  status: {
    color: '#46afcc',
    fontWeight: 500,
    textAlign: 'center',
  },
  titleReview: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '1.375em',
    color: '#484848',
    padding: '4px 0',
  },
  comments:{
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    color: '#7E8082',
    padding: '4px 0',
  },
  avatar:{
    width: 60,
    height: 60,
  },
  nameUser:{
    fontSize: 17,
  },
  boxPagination:{
    display: 'flex',
    justifyContent: 'center',
  },
  boxMap:{
    height:300,
    margin: '10px 0',
    borderRadius: 5,
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  }
});

const BoxReviews: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const itemRender = (current:number, type:string, element:any) => {
    if (type === 'page') {
      return <a href={`#${current}`}>{current}</a>;
    }
    return element;
  };
  return (
    <Fragment>
      <div className = {classes.rowMargin}>
        <Typography className = {classes.titleHighlight}>
          Ratings
        </Typography>
        <Grid container>
          <Grid item xs = {3}>
            <div className = {classes.rowMargin2}>
              <div style = {{textAlign: 'center'}}>
                <StarRatings
                  rating = {4.5} //index rating
                  starDimension = '24px'
                  starSpacing = '1px'
                  starRatedColor = '#46afcc'
                />
              </div>
              <div className = {classes.boxMark}>
                <div className = {classes.Mark}>
                  <Typography variant = {"h5"} className = {classes.TypoMark}>
                    9.9
                  </Typography>
                </div>
              </div>
              <Typography variant = {"h5"} className = {classes.status}>
                Excellent
              </Typography>
            </div>
          </Grid>
          <Grid item container xs = {9}>
            <Grid item xs = {12}>
              <div className = {classes.rowMargin2}>
                <Grid container className = {classes.rowMargin2}>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <Typography className = {classes.titleReview}>
                      Accuracy
                    </Typography>
                  </Grid>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <StarRatings
                      rating = {5} //index rating
                      starDimension = '24px'
                      starSpacing = '1px'
                      starRatedColor = '#46afcc'
                    />
                  </Grid>
                </Grid>
                <Grid container className = {classes.rowMargin2}>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <Typography className = {classes.titleReview}>
                      Cleanliness
                    </Typography>
                  </Grid>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <StarRatings
                      rating = {5} //index rating
                      starDimension = '24px'
                      starSpacing = '1px'
                      starRatedColor = '#46afcc'
                    />
                  </Grid>
                </Grid>
                <Grid container className = {classes.rowMargin2}>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <Typography className = {classes.titleReview}>
                      Location
                    </Typography>
                  </Grid>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <StarRatings
                      rating = {4.5} //index rating
                      starDimension = '24px'
                      starSpacing = '1px'
                      starRatedColor = '#46afcc'
                    />
                  </Grid>
                </Grid>
                <Grid container className = {classes.rowMargin2}>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <Typography className = {classes.titleReview}>
                      Communication
                    </Typography>
                  </Grid>
                  <Grid item xs = {6} style = {{textAlign: 'right'}}>
                    <StarRatings
                      rating = {4.5} //index rating
                      starDimension = '24px'
                      starSpacing = '1px'
                      starRatedColor = '#46afcc'
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className = {classes.rowMargin}>
        <Typography className = {classes.titleHighlight}>
          345 Reviews
        </Typography>
        <Grid container className = {classes.rowMarginBorderTop}>
          <Grid item container xs={12}>
            <Grid item xs={2}>
              <Avatar alt="Avatar" src={avatarDemo} className={classes.avatar}/>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6' className = {classes.nameUser}>Nguyen Hong Lien Huong</Typography>
              <Typography variant={"caption"}>December 2018</Typography>
              <Typography className = {classes.comments}>
                Great location in the city! Easy to get to many places in the city within walking distance or by subway.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className = {classes.rowMarginBorderTop}>
          <Grid item container xs={12}>
            <Grid item xs={2}>
              <Avatar alt="Avatar" src={avatarDemo} className={classes.avatar}/>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6' className = {classes.nameUser}>Duy</Typography>
              <Typography variant={"caption"}>December 2018</Typography>
              <Typography className = {classes.comments}>
                Great location in the city!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className = {classes.rowMarginBorderTop}>
          <Grid item container xs={12}>
            <Grid item xs={2}>
              <Avatar alt="Avatar" src={avatarDemo} className={classes.avatar}/>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6' className = {classes.nameUser}>Cristiano Ronaldo</Typography>
              <Typography variant={"caption"}>December 2018</Typography>
              <Typography className = {classes.comments}>
                Great location in the city! Easy to get to many places in the city within walking distance or by subway. Apartment was very clean and had everything we needed.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.boxPagination}>
          <Pagination total={100} itemRender={itemRender} locale={localeInfo}/>
        </div>
      </div>
      <div className = {classes.rowMargin}>
        <Typography className = {classes.titleHighlight}>
          Map
        </Typography>
        <div className = {classes.boxMap}>
            <LocationHomeMap zoom={14} center={{lat: 21.02, lng: 105.83}}/>
        </div>
      </div>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BoxReviews);
