import * as act from '@/store/actions/actionTypes';
import {ReducersType} from '@/store/reducers';
import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';
import {SearchFilterState, SearchFilterAction, DateRange} from '@/store/reducers/searchFilter';
import moment, {Moment} from 'moment';
import React, {useState, useEffect, ComponentType, Fragment, useContext} from 'react';
import {FocusedInputShape, DayPickerRangeController} from 'react-dates';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import 'react-dates/initialize';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-homepage.scss';
import _ from 'lodash';
import {RoomDetailsContext, IRoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import Button from "@material-ui/core/Button";

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  rowMargin: {
    margin: '10px 0',
    padding: '12px 24px',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '10px 0px',
    },
    borderTop: '1px solid #e0e0e0',
  },
  titleHighlight: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: '#484848',
    display: 'inline-block'
  },
  btClear: {
    float: 'right'
  },
  boxCalendar: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  }
});
interface LocalProps extends IProps {
  filter: SearchFilterState

  updateDate(date: DateRange): any
}

// @ts-ignore
const DatePickerRoomDetail: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, filter, updateDate} = props;

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape>('startDate');
  const [maxDate, setMaxDate]           = useState<string | undefined>(undefined);
  const [now]                           = useState<Moment>(moment());

  const {state}    = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const {schedule} = state;

  const {startDate, endDate} = filter;

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    if (focusedInput === 'startDate') {
      endDate = null;
    }
    updateDate({startDate, endDate});
  };

  const blockingDate = (day: Moment) => {
    let isBlocked = _.indexOf(schedule, day.format('YYYY-MM-DD')) !== -1;

    if (focusedInput === 'endDate' && !!sd) {
      let pastDayBlocked = day.diff(sd, 'days') < 0;
      let chainBlocked   = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked || chainBlocked;
    }
    return isBlocked;
  };

  useEffect(() => {
    let checkFilter = !filter.startDate && !filter.endDate;
    let oldDate     = moment(filter.startDate) < moment();

    if (checkFilter || oldDate) {
      updateDate({
        startDate: moment(),
        endDate: moment().add(7, 'days'),
      });
    }
  }, []);

  useEffect(() => {
    let date = _.find(schedule, block => moment(block).diff(sd!) > 0);

    setMaxDate(date);
  }, [filter]);

  return (
    <Fragment>
      <div className = {classes.rowMargin}>
        <Typography className = {classes.titleHighlight}>
          Availability
        </Typography>
        <Button variant = 'outlined' className = {classes.btClear}
                onClick = {() => setFocusedInput('startDate')}>Clear</Button>
        <div className = {classes.boxCalendar}>
          <DayPickerRangeController
            startDate = {sd}
            endDate = {ed}
            onDatesChange = {({startDate, endDate}) => {
              onDateChange(startDate, endDate);
            }}
            focusedInput = {focusedInput}
            onFocusChange = {focusedInput => {
              setFocusedInput(!!focusedInput ? focusedInput : 'startDate');
            }}
            numberOfMonths = {2}
            // verticalHeight = {400}
            noBorder
            enableOutsideDays = {false}
            isDayBlocked = {blockingDate}
            isOutsideRange = {(day: Moment) => day.diff(now, 'days') < 0}
            hideKeyboardShortcutsPanel
            initialVisibleMonth = {() => moment()}
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateDate: (date: DateRange) => dispatch({
      type: act.CHANGE_DATE,
      date: date,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(DatePickerRoomDetail);