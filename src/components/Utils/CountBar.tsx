import * as act from '@/store/actions/actionTypes';
import {ReducersType} from '@/store/reducers';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import React, {ComponentType, MouseEvent, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

interface IProps {
  'p-classes': any;
  singular: string;
  plural: string;
  name: string
  divider?: boolean;
}

interface IPropsLocal extends IProps {
  filter?: any;
  changeValue(value: number, field: string): Dispatch;
}

// @ts-ignore
const CountBar: ComponentType<IProps> = (props: IPropsLocal) => {
  const classes             = props['p-classes'];
  const dividerStatus       = props.divider;
  let pluralLowerCase       = props.name.toLowerCase() + 'Count';
  const [status, setStatus] = useState(true);

  useEffect(() => {
    let count = props.filter[pluralLowerCase];
    setStatus(count <= 1);
  }, [props.filter[pluralLowerCase]]);

  /**
   * Change value of property
   * @param event
   * @param number
   */
  const handleCount = (event: MouseEvent<HTMLElement>, number: number) => {
    event.preventDefault();
    props.changeValue!(number, pluralLowerCase);
  };

  return (
    <Grid container spacing = {8} justify = 'center' alignItems = 'center'>
      <Grid item sm = {2} xs = {3}>
        <Button onClick = {event => handleCount(event, -1)} disabled = {status}>
          <NavigateBefore/>
        </Button>
      </Grid>
      <Grid item sm = {8} xs = {6} style = {{
        textAlign: 'center',
      }}>
        <span className = {classes.countNumber}>{props.filter[pluralLowerCase]}</span>&nbsp;
        <span className = {classes.textCount}>
            {(props.filter[pluralLowerCase] > 1)
              ? props.plural
              : props.singular}</span>
      </Grid>
      <Grid container item sm = {2} xs = {3} alignItems = 'flex-end'>
        <Button onClick = {event => handleCount(event, 1)} style = {{marginLeft: 'auto'}}>
          <NavigateNext/>
        </Button>
      </Grid>
      {dividerStatus
        ? <Grid item xs = {12}>
          <Divider />
        </Grid>
        : ''}
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeValue: (value: number, field: string) => dispatch({
      type: act.ADD_VALUE,
      field: field,
      value: value,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
)(CountBar);

