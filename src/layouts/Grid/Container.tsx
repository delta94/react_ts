import React, {ComponentType, Fragment} from 'react';
import Grid, {GridSize} from '@material-ui/core/Grid/Grid';

interface IProps {
  xs: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
  sm?: GridSize
  className?: string
}

const GridContainer: ComponentType<IProps> = props => {
  return (
    <Fragment>
      <Grid container justify = 'center' alignContent = 'center' className = {props.className}>
        <Grid item
              xs = {props.xs}
              sm = {props.sm || props.xs}
              md = {props.md || props.xs}
              lg = {props.lg || props.xs}
              xl = {props.xl || props.xs}>
          {props.children}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GridContainer;
