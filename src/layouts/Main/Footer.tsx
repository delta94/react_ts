import {ThemeCustom} from '@/components/Theme/Theme';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import GridContainer from '@/layouts/Grid/Container';
interface IProps {
   classes?: any
}

// @ts-ignore
const styles: any = (theme: ThemeCustom) => createStyles({
   root: {
      backgroundColor : '#333',
      margin:0,
      width: '100%',
   },
   firstItem:{
      paddingTop: theme!.spacing!.unit! * 5,
      paddingBottom: theme!.spacing!.unit! * 5,
      width: '100%',
      backgroundColor : '#eee',
   },
   paper: {
      paddingTop: 30,
      color: '#999',
      backgroundColor : '#333',
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '14px',
      },
   },
   rowFooter: {
   	backgroundColor : '#333',
   },
   linksList: {
      backgroundColor : '#eee',
   },
   textCenter:{
      textAlign: 'center',
   },
   textLeft: {
      textAlign: 'left',
      paddingBottom: 15,
      [theme!.breakpoints!.only!('xs')]: {
         textAlign: 'center',
         fontSize: '14px',
      },
   },
   textRight: {
      textAlign: 'right',
      paddingBottom: 15,
      [theme!.breakpoints!.only!('xs')]: {
         textAlign: 'center',
         fontSize: '14px',
      },
   },
   icon: {
      fontSize: 32,
   },
   linksListGroupTitle:{
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '14px',
      },
      color: '#5b5b5b',
      fontSize: '16px',
      marginBottom: '0.5em',
   },
   linksListGroupList: {
      [theme!.breakpoints!.only!('sm')]: {
         fontSize: '13px',
      },
      display: 'inline-block',
      listStyle: 'none',
      marginTop: 0,
      paddingLeft: 0,
      fontSize: '15px',
      color: '#5b5b5b',
   },

});

// @ts-ignore
const Footer: ComponentType<IProps> = (props: IProps) => {
   const {classes} = props;

   return (
      <Fragment>
         <div className={classes.firstItem}>
            <GridContainer xs = {11}>
               <Grid container>
                  <Grid item xs={6} sm={3} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>Trợ giúp</h5>
                     <ul className={classes.linksListGroupList}>
                        <p><strong>C&Ocirc;NG TY CỔ PHẦN WESTAY</strong><br /> <strong>Số điện thoại li&ecirc;n hệ:</strong> 0941 983 046<br /> <strong>Lĩnh vực kinh doanh:</strong>&nbsp;S&agrave;n giao dịch TMĐT<br /> <strong>Địa chỉ t&ecirc;n miền:</strong>&nbsp;http://westay.org/vi<br /> <strong>Loại h&igrave;nh website: </strong>S&agrave;n giao dịch TMĐT</p> <p>&nbsp;</p> <p><a href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=41005"><img alt="" src="http://online.gov.vn/seals/dlxOBO9dxLmirYHstOPHmA==.jpgx" /></a></p>
                     </ul>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>Trợ giúp</h5>
                     <ul className={classes.linksListGroupList}>
                        <li>Liên hệ vớii chúng tôi</li>
                        <li>Câu hỏi thường gặp</li>
                        <li>Chính sách Bảo mật</li>
                        <li>Chính sách với cookie</li>
                        <li>Ðiều khoản sử dụng</li>
                     </ul>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>Trợ giúp</h5>
                     <ul className={classes.linksListGroupList}>
                        <li>Liên hệ vớii chúng tôi</li>
                        <li>Câu hỏi thường gặp</li>
                        <li>Chính sách Bảo mật</li>
                        <li>Chính sách với cookie</li>
                        <li>Ðiều khoản sử dụng</li>
                     </ul>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.linksList}>
                     <h5 className={classes.linksListGroupTitle}>Trợ giúp</h5>
                     <ul className={classes.linksListGroupList}>
                        <li>Liên hệ vớii chúng tôi</li>
                        <li>Câu hỏi thường gặp</li>
                        <li>Chính sách Bảo mật</li>
                        <li>Chính sách với cookie</li>
                        <li>Ðiều khoản sử dụng</li>
                     </ul>
                  </Grid>
               </Grid>
            </GridContainer>
         </div>

         <div className={classes.root}>
            <GridContainer xs = {11}>
               <Grid container>
                  <Grid item xs={12} sm={6} className={classes.rowFooter}>
                     <Paper
                        elevation={0}
                        className={classNames(
                           classes.paper,
                           classes.textLeft,
                        )}
                     >
                        © 2017 – 2019 Công ty Westay giữ toàn quyền
                     </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.rowFooter}>
                     <Paper
                        elevation={0}
                        className={classNames(
                           classes.paper,
                           classes.textRight,
                        )}
                     >
                        Westay.org là công ty cổ phần của tập doàn VNP.
                     </Paper>
                  </Grid>
               </Grid>
            </GridContainer>
         </div>
      </Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(Footer);

export const style = styles;
