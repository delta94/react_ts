import {ThemeCustom} from '@/components/Theme/Theme';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import {blue} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React, {ComponentType, Fragment, useState, useContext} from 'react';
import StarRatings from 'react-star-ratings';
import {compose} from 'recompose';
import classNames from 'classnames';

interface IProps {
  classes?: any
  /**
   * Number of star
   * @default 5
   */
  rate?: number
  totalRate?: number
  dimension?: number;
  spacing?: number;
  ratedColor?: string;
  id: string;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  checkboxPadding: {
    padding: 0,
  },
  hover: {
    color: blue[600],
    cursor: 'pointer',
  },
  starMargin: {
    margin: '2px 0 0 10px',
  },
});

const RatingBar: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Fragment>
      <label htmlFor = {props.id}
             onMouseEnter = {() => setHover(true)}
             onMouseLeave = {() => setHover(false)}
             className = {classes.hover}
      >
        <Grid container spacing = {8} alignItems = 'center'>
          <Grid item sm = {1}>
            <Checkbox id = {props.id} color = 'primary' classes = {{
              root: classNames(classes.checkboxPadding, {[classes.hover]: hover}),
            }} />
          </Grid>
          <Grid item className = {classes.starMargin}>
            {(props.totalRate && (props.totalRate > 0)) ? (
              <StarRatings
                numberOfStars = {props.totalRate || 5}
                rating = {props.rate || props.totalRate || 5}
                starDimension = {`${props.dimension || 20}px`}
                starSpacing = {`${props.spacing || 1}px`}
                starRatedColor = {props.ratedColor || '#FFC412'}
              />
            ) : <Typography variant = 'caption'>No rating</Typography>}

          </Grid>
          <Grid item sm = {2} className = {classes.starMargin}>
            <Typography variant = 'caption' className = {classNames({
              [classes.hover]: hover,
            })}>(69)</Typography>
          </Grid>
        </Grid>
      </label>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RatingBar);
