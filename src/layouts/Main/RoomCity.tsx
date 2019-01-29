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
import {NumberRoomCity} from '@/types/Requests/Rooms/RoomResponses';
interface IProps {
   classes?: any,
   room: NumberRoomCity,
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
   	width:'95% !important',
   },
   gridListTileBar:{
   	textAlign:'center',
   },
   titleListTileBar:{
   	fontSize:'1.1em',
   },
   subtitleListTileBar:{
   	fontSize:'0.8em',
   },
});

// @ts-ignore
const RoomCity: ComponentType<IProps> = (props: IProps) => {
   const {classes,room} = props;
   return (
      <Fragment>
         <div className={classes.root}>
   	      <GridList cellHeight={300} className={classes.gridList}>
   	         <GridListTile className={classes.gridListTile}>
   	            <img src={imgRoomDemo} />
   	            <GridListTileBar
   	            	className={classes.gridListTileBar}
   	               title={room.name_city}
   	               subtitle={<span>Hiện có: {room.total_rooms} phòng</span>}
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
