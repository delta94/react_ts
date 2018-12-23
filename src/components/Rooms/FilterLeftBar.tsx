import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useEffect} from 'react';
import {compose} from 'recompose';
import Typography from '@material-ui/core/Typography/Typography';
import _ from 'lodash';
import Hidden from '@material-ui/core/Hidden';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Divider from '@material-ui/core/Divider/Divider';
import Blue from '@material-ui/core/colors/blue';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  ul: {
    listStyleType: 'none',
    marginBlockStart: '0px',
    paddingInlineStart: '1rem',
    paddingBlockStart: '0.5rem',
    marginBlockEnd: 0,
  },
  checkboxRoot: {
    padding: 5,
  },
  limitItems: {},
  expandText: {
    fontSize: '0.8rem',
    color: Blue[400],
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const amenities = [
  {id: 1, name: 'Wifi'},
  {id: 2, name: 'Washing Machine'},
  {id: 3, name: 'Television'},
  {id: 4, name: 'Shampoo'},
  {id: 5, name: 'Microwave'},
  {id: 7, name: 'Air conditioner'},
  {id: 8, name: 'Toilet paper'},
  {id: 9, name: 'Heater'},
  {id: 10, name: 'Internet'},
  {id: 11, name: 'Garden'},
];

// @ts-ignore
const FilterLeftBar: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [list, setList]         = useState(amenities);

  useEffect(() => {
    const newList = isExpand ? amenities : _.slice(amenities, 0, 3);
    setList(newList);
  }, [isExpand]);

  return (
    <Fragment>
        <Typography variant = 'subtitle2'>Room Amenities</Typography>
        <ul className = {classes.ul}>
          {_.map(list, (o) => (
            <li key = {o.id}>
              <FormControlLabel
                control = {<Checkbox
                  name = 'room-amenities'
                  color = 'primary'
                  value = {o.id.toString()}
                  classes = {{
                    root: classes.checkboxRoot,
                  }}
                />}
                label = {`${o.name} (10)`}
              />
            </li>
          ))}
        </ul>
        <p style = {{textAlign: 'right', marginBlockStart: 0}}>
        <span
          className = {classes.expandText}
          onClick = {() => setIsExpand(!isExpand)}
        >Show {isExpand ? 'less' : `6 more`}
        </span>
        </p>
        <Divider />
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(FilterLeftBar);
