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

interface IProps {
   classes?: any,
   room: RoomIndexRes,
}

const styles: any = (theme: ThemeCustom) => createStyles({
	card: {
		width:'96%',
	},
	media: {
		height: '14em',
	},
	cardContent:{
		padding:0,
		paddingTop: '1em',
	},
	nameCity: {
		fontWeight: 500,
		fontSize: '1em !important',
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
		fontWeight: 500 ,
		fontSize: '1.5em !important',
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
	},
	priceRoom: {
		fontWeight: 'normal',
		fontSize: '1em !important',
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
});

// @ts-ignore
const RoomHot: ComponentType<IProps> = (props: IProps) => {
   const {classes,room} = props;

   return (
      <Fragment>
	   	<Card className={classes.card} elevation={0}>
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
				   	<Typography component="p" className={classes.priceRoom}>
					   	{`${formatMoney(room.price_day, 0)}`}đ <sub>/ngày</sub>
				   	</Typography>
				   	<div>
				   		<span className={classes.starRatings}>
						   	<StarRatings
							   	rating = {room.avg_rating}
							   	starDimension = '14px'
							   	starSpacing = '1px'
							   	starRatedColor = '#008489 '
						   	/>
					   	</span>
					   	<p className={classes.totalReview}>
					   		{room.total_review}
					   	</p>
				   	</div>
			   	</CardContent>
		   	</CardActionArea>
	   	</Card>
   	</Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(RoomHot);
