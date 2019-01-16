import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useContext, useState} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import Toolbar from "@material-ui/core/Toolbar";
import GridContainer from "@/layouts/Grid/Container";
import {AppBar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from '@material-ui/core/Slide';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {GlobalContext, IGlobalContext} from "@/store/context/GlobalContext";
import Hidden from "@material-ui/core/Hidden";


interface IProps extends RouteChildrenProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  barSearch: {
    bottom:0,
    top:'unset',
    boxShadow:'0px 5px 5px 7px rgba(0,0,0,0.2)',
  },
  price: {
    fontSize: 18,
    fontWeight: 500,
    [theme!.breakpoints!.down!('sm')]: {
      fontSize: 16,
    },
  },
  perTime: {
    fontSize: 13,
    [theme!.breakpoints!.down!('sm')]: {
      fontSize: 12,
    },
  },
  dialogTitle:{
    textAlign:'right',
    padding:0,
  },
  dialogContent:{
    padding:0,
  },
  btBook:{
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 11,
    },
  }
});
const Transition=(props:IProps)=> {
  return <Slide direction="up" {...props} />;
};

const NavBottomBook: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [openDialog,setOpenDialog] = useState<boolean>(false);
  const {width} = useContext<IGlobalContext>(GlobalContext);

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Fragment>
      <AppBar position = 'fixed' color='inherit' classes = {{root: classes.barSearch}}>
        <Toolbar>
          <GridContainer xs = {12} sm = {12} md = {11} lg = {10}>
            <Grid container spacing = {16}>
              <Grid item xs={6} sm={9}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <div style = {{textAlign: 'center'}}>
                      <span className = {classes.price}>1.700.000 <sup>&#8363;</sup></span>
                      <sub className = {classes.perTime}>/day</sub>
                    </div>
                  </Grid>
                  <Hidden xsDown>
                  <Grid item xs={12} sm={4}>
                    <div style = {{textAlign: 'center'}}>
                      <span className = {classes.price}>1.000.000 <sup>&#8363;</sup></span>
                      <sub className = {classes.perTime}>/4h</sub>
                    </div>
                  </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={3} style = {{textAlign: 'right'}}>
                <Button variant = 'outlined' color = {'primary'} onClick={handleClick} className={classes.btBook}>
                  Request to Book
                </Button>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>

      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        scroll='body'
        fullScreen={width==='xs'}
        maxWidth='xs'
        open={openDialog}
        onClose={handleClick}
      >
        <DialogTitle classes={{root:classes.dialogTitle}}>
          <IconButton className={classes.button} aria-label="Close" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{root:classes.dialogContent}}>
          <BoxBooking/>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(NavBottomBook);
