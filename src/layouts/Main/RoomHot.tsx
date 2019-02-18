import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';

import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {formatMoney} from '@/utils/mixins';

import mapMarker from '@/assets/SvgIcon/map-marker.svg';
import classNames from 'classnames';

interface IProps {
   classes?: any,
   room: RoomIndexRes,
}

const styles: any = (theme: ThemeCustom) => createStyles({
	card: {
		padding:'0 5px',
		backgroundColor: 'transparent !important',
	},
	media: {
		height: '14em',
		borderRadius: '0.2em !important',
	},
	cardContent:{
		padding:0,
		paddingTop: '1em',
	},
	nameCity: {
		fontWeight: 500,
		fontSize: '0.8em !important',
		lineHeight: '16px !important',
		letterSpacing: 'normal !important',
		textTransform: 'uppercase',
		color: 'rgb(118, 118, 118) !important',
		textOverflow: 'ellipsis !important',
		whiteSpace: 'nowrap',
		marginBottom: '2px !important',
		overflow: 'hidden !important',
	},
	nameRoom: {
		fontWeight: 600 ,
		fontSize: '1em !important',
		lineHeight: '21px !important',
		maxHeight: '42px !important',
		textOverflow: 'ellipsis !important',
		display: '-webkit-box !important',
		marginTop: '7px !important',
		marginBottom: '4px !important',
		overflow: 'hidden !important',
		color: 'rgb(72, 72, 72) !important',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
		textTransform: 'uppercase',
	},
	priceRoom: {
		fontWeight: 500,
		fontSize: '1.075em !important',
		lineHeight: '18px !important',
		letterSpacing: 'normal !important',
		color: 'rgb(72, 72, 72) !important',
		marginBottom: '4px !important',
	},
	totalReview:{
		overflowWrap: 'break-word',
		fontSize: '12px !important',
		fontWeight: 600 ,
		lineHeight: '1.33333em !important',
		color: 'rgb(72, 72, 72) !important',
		margin: '0px !important',
		float: 'left',
    	paddingLeft: '4px',
	},
	starRatings:{
		float: 'left',
	},

	verticalMid: {
		verticalAlign: 'middle',
	},

	mapMarker: {
		width: '0.8rem',
		marginLeft: 3,
	},
	address: {
		fontSize: '0.8125rem',
		fontWeight: 500,
		color: '#909090'
	},
});

// @ts-ignore
const RoomHot: ComponentType<IProps> = (props: IProps) => {
   const {classes,room} = props;

   const cardEvent = () => {
   	let win = window.open(`/room/${room.id}`, '_blank');
   	win!.focus();
   };
   return (
      <Fragment>
	   	<Card className={classes.card} elevation={0} onClick = {cardEvent}>
		   	<CardActionArea>
			   	<CardMedia
				   	className={classes.media}
				   	image={`http://westay.org/storage/rooms/${room.media.data[0].image}`}
				   	title="Ảnh phòng"
			   	/>
			   	<CardContent className={classes.cardContent}>
			   		<Typography component="p" className={classes.nameCity}>
					   	{room.room_type_txt}
				   	</Typography>
				   	<Typography variant="h5" component="h2" className={classes.nameRoom}>
				   		{room.details.data[0].name}
				   	</Typography>
				   	<div style={{display: 'inline-block', width: '100%'}}>
					   	<span className = {classes.verticalMid}>
	                      <a className = {classes.address}>{`
	                      ${room.district.data.name},
	                      ${room.city.data.name}
	                      `}</a>
	                    </span>
                    </div>
				   	<div style={{display: 'inline-block', width: '100%', paddingTop: '10px'}}>
				   		<span className={classes.starRatings}>
						   	<StarRatings
								numberOfStars={room.standard_point}
							   	starDimension = {'14px'}
							   	starSpacing = {'1px'}
							   	starEmptyColor = {'#46AFCC'}
						   	/>
					   	</span>
					   	{/*<p className={classes.totalReview}>
					   		{room.total_review}
					   	</p>*/}
				   	</div>
				   	<Typography component="p" className={classes.priceRoom}>
					   	{`${formatMoney(room.price_day, 0)}`}đ <sub>/ngày</sub> &ensp;-&ensp; {`${formatMoney(room.price_hour, 0)}`}đ <sub>/4 giờ</sub>
				   	</Typography>

			   	</CardContent>
		   	</CardActionArea>
	   	</Card>
   	</Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(RoomHot);
