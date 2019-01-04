import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useState, Fragment, ChangeEvent, useContext, useEffect} from 'react';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography';
import Loadable from 'react-loadable';
import '@/styles/date-picker.scss';
import Select from '@material-ui/core/Select/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Button from '@material-ui/core/Button/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {getData, IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import {AxiosError} from 'axios';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import Menu from '@material-ui/core/Menu/Menu';

interface IProps {
  classes?: any,
}

const DatePicker = Loadable({
  loader: (): Promise<any> => import('@/components/Utils/DateRangeSingle'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({
  boxPadding: {padding:16},
  rowMargin:{
    marginBottom:16,
  },
  PaperBooking:{
    border:'1px solid #e4e4e4',
    position:'sticky',
    top: '15%',
    left: 'auto',
    right: 0,
  },
  PaperDatePick:{
    border:'1px solid #e4e4e4',
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
    color:'#484848'
  },
  perTime: {
    fontSize: 13,
  },
  pricePerHour:{
    textAlign:'center',
  },
  pricePerDay:{
    textAlign:'center',
    borderRight:'1px solid #e0e0e0',
  },
  formControl:{
    height:50,
    width:'100%',
    backgroundColor:'#ffffff',
  },
  inputOutline:{
    border:'none',
  },
  title:{
    overflowWrap: 'break-word',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '1.28571em',
    color: 'rgb(72, 72, 72)',
    margin: 0,
  },
  iconHelp:{
    verticalAlign: 'sub',
    fontSize: 'initial',
    paddingLeft: 5,
  },
  menuSelect:{
    maxHeight: 'calc(100% - 60%)'
  },
});

const BoxBooking: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [ckbox, setCkbox]       = useState<boolean>(false);
  const [guest,setGuest] = useState<number>(1);
  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {rooms} = state;
  if (rooms == null){return <SimpleLoader/>}

  const handleChangeSelect = (event:ChangeEvent<HTMLSelectElement>) => {
    setGuest(parseInt(event.target.value));
  };

  const formatNumber= (x:number) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const arrMenuItem = (x:number) =>{
    let i=1;
    let arr = [];
    while (i <= x){
       arr.push(<MenuItem key={i} value={i}>{i} guest</MenuItem>);
      i++;
    }
    return arr;
  };

  return (
    <Fragment>
      <Paper square elevation={8} className={classes.PaperBooking}>
       <div className={classes.boxPadding}>
         <Grid container className={classes.rowMargin}>
           <Grid item xs={6}>
             <div className={classes.pricePerDay}>
               <span className = {classes.price}>{formatNumber(rooms!.price_day)} <sup>&#8363;</sup></span>
               <sub className={classes.perTime}>/day</sub>
             </div>
           </Grid>
           <Grid item xs={6}>
               {rooms!.price_hour == 0 ? (
                 <div className={classes.pricePerHour}>
                    <span className = {classes.price}>No rental hourly</span>
                 </div>
               ) : (
                 <div className={classes.pricePerHour}>
                   <span className = {classes.price}>{formatNumber(rooms!.price_hour)} <sup>&#8363;</sup></span>
                   <sub className={classes.perTime}>/4h</sub>
                 </div>
               )}
           </Grid>
         </Grid>
         <Divider/>
         <Grid container>
           <Grid item xs={12}>
             <FormGroup>
               <FormControlLabel
                 control={
                   <Checkbox
                     name=""
                     checked={ckbox}
                     onChange={()=>setCkbox(!ckbox)}
                     value="setHour"
                     color='primary'
                     disabled={rooms!.price_hour == 0}
                   />
                 }
                 label="Set by the hour"
               />
             </FormGroup>
           </Grid>
         </Grid>
         <Grid container>
           <Grid item xs={12} className={classes.rowMargin}>
             <Typography className={classes.title}>
                Dates
             </Typography>
             <Paper square elevation={0} className={classes.PaperDatePick}>
               <DatePicker/>
             </Paper>
           </Grid>
           <Grid item xs={12} className={classes.rowMargin}>
             <Typography className={classes.title}>
               Guests
             </Typography>
             <Paper square elevation={0} className={classes.PaperDatePick}>
               <FormControl variant="outlined" className={classes.formControl}>
                 <Select
                   MenuProps={{
                     classes:{paper:classes.menuSelect}
                   }}
                   displayEmpty
                   value={guest}
                   onChange={handleChangeSelect}
                   input={
                     <OutlinedInput
                       notched={false}
                       labelWidth={0}
                       name="time"
                       id="outlined-time-simple"
                       classes={{notchedOutline:classes.inputOutline}}
                     />
                   }
                 >
                   {arrMenuItem(rooms!.max_guest)}
                 </Select>
               </FormControl>
             </Paper>
           </Grid>
           <Grid item xs={12} className={classes.rowMargin}>
             <Button variant={"contained"} color={"primary"} fullWidth  className={classes.btSearch} size={'large'}>
               Request to Book
             </Button>
           </Grid>
         </Grid>
         <Divider/>
         <Grid container>
           <Grid item xs>
            <span className={classes.title}>This room may not available on your dates!
              <Tooltip title="This happened when the host want to know who you are" placement="top">
                <HelpOutline className={classes.iconHelp}/>
              </Tooltip>
            </span>
             <Typography variant={"caption"}>Don't worry, send a booking request to the host, they will confirm if the room is available for you.</Typography>
           </Grid>
         </Grid>
       </div>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BoxBooking);
