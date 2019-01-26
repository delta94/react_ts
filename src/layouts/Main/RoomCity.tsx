import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgRoomDemo from '@/assets/room_demo.jpeg';
import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import imgRoomDemo3 from '@/assets/room_demo3.jpeg';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
interface IProps {
   classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
   root: {
   	display: 'flex',
   	flexWrap: 'wrap',
   	justifyContent: 'space-around',
   	overflow: 'hidden',
   	backgroundColor: theme!.palette!.background!.paper!,
   },
   gridList: {
   	width: '100%',
   	height: 'auto',
   },
   gridListTile:{
   	width:'90% !important',
   },
   gridListTileBar:{
   	textAlign:'center',
   },
   titleListTileBar:{
   	fontSize:'1.2em',
   },
   subtitleListTileBar:{
   	fontSize:'0.9em',
   },
});

// @ts-ignore
const RoomCity: ComponentType<IProps> = (props: IProps) => {
   const {classes} = props;

   return (
      <Fragment>
         <div className={classes.root}>
   	      <GridList cellHeight={300} className={classes.gridList}>
   	         <GridListTile className={classes.gridListTile}>
   	            <img src={imgRoomDemo} />
   	            <GridListTileBar
   	            	className={classes.gridListTileBar}
   	               title={'Hà Nội'}
   	               subtitle={<span>100$ <sub>/1day</sub> </span>}
   	               classes={{title:classes.titleListTileBar,subtitle:classes.subtitleListTileBar}}
   	            />
   	          </GridListTile>
   	      </GridList>
       	</div>
       </Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(RoomCity);
