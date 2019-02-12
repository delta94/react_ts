import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, ChangeEvent} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import StarRatings from 'react-star-ratings';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/es/Card';
import CardActionArea from '@material-ui/core/es/CardActionArea';
import CardContent from '@material-ui/core/es/CardContent';
import CardMedia from '@material-ui/core/es/CardMedia';
import TextField from '@material-ui/core/TextField';
import {SentimentVeryDissatisfied, Favorite,SentimentVerySatisfied} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  card: {
    padding: '0 5px',
    backgroundColor: 'transparent !important',
    marginTop: 15,
  },
  media: {
    height: '12em',
    borderRadius: '0.2em !important',
  },
  cardContent: {
    padding: 0,
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
    fontWeight: 500,
    fontSize: '1.25em !important',
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
    fontWeight: 'normal',
    fontSize: '1em !important',
    lineHeight: '18px !important',
    letterSpacing: 'normal !important',
    color: 'rgb(72, 72, 72) !important',
    marginBottom: '4px !important',
  },
  totalReview: {
    overflowWrap: 'break-word',
    fontSize: '12px !important',
    fontWeight: 600,
    lineHeight: '1.33333em !important',
    color: 'rgb(72, 72, 72) !important',
    margin: '0px !important',
    float: 'left',
    paddingLeft: '4px',
  },
  starRatings: {
    float: 'left',
  },
  boxPadding: {
    padding: 20,
  },
  title: {
    fontWeight: 500,
    fontSize: '1em',
    lineHeight: '21px',
    maxHeight: '42px',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    overflow: 'hidden !important',
    color: 'rgb(109, 95, 95)',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginTop: '13px',
  },
  review: {
    padding: '0px 5px',
  },
  spanLike:{
    fontWeight: 600,
    fontSize: '1em',
    lineHeight: '21px',
    paddingRight:25,
    color: 'rgb(109, 95, 95)',
  },
  radio : {
    paddingLeft: 0
 }
});

// @ts-ignore
const ReviewRoom: ComponentType<IProps> = (props: IProps) => {
  const {classes}           = props;
  const [rating_cleanliness, setRating_cleanliness] = useState<number>(0);
  const [rating_quality, setRating_quality] = useState<number>(0);
  const [rating_service, setRating_service] = useState<number>(0);
  const [rating_valuable, setRating_valuable] = useState<number>(0);
  const [rating_avg_rating, setRating_avg_rating] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number|null>(null);

  const changeRating_cleanliness = (ratings: number) => {
    setRating_cleanliness(ratings);
  };
  const changeRating_quality = (ratings: number) => {
    setRating_quality(ratings);
  };
  const changeRating_service = (ratings: number) => {
    setRating_service(ratings);
  };
  const changeRating_valuable = (ratings: number) => {
    setRating_valuable(ratings);
  };
  const changeRating_avg_rating = (ratings: number) => {
    setRating_avg_rating(ratings);
  };

 const handleToggle = (event:ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(event.target.value)); // event luon trả về giá trị là string
  };
  return (
    <Fragment>
      <Paper square className = {classes.boxPadding}>
        <Grid container spacing = {32} justify = 'center' alignContent = 'center'>
          <Grid item xs = {12} sm = {12} md = {4}>
            <Typography variant = 'h6' className = {classes.review}>
              Đánh giá và nhận xét
            </Typography>
            <Card className = {classes.card} elevation = {0}>
              <CardActionArea>
                <CardMedia
                  className = {classes.media}
                  image = {`http://westay.org/storage/rooms/2018_07_18_9e54dd592a.jpeg`}
                  title = 'Ảnh phòng'
                />
                <CardContent className = {classes.cardContent}>
                  <Typography component = 'p' className = {classes.nameCity}>
                    Phòng riêng
                  </Typography>
                  <Typography variant = 'h5' component = 'h2' className = {classes.nameRoom}>
                    Friendly Villa Twin Room
                  </Typography>
                  <Typography component = 'p' className = {classes.priceRoom}>
                    950000đ <sub>/ngày</sub> - 400000đ <sub>/4 giờ</sub>
                  </Typography>
                  <div>
                    <span className = {classes.starRatings}>
                      <StarRatings
                        rating = {5} //index rating
                        starDimension = '14px'
                        starSpacing = '1px'
                        starRatedColor = '#46AFCC'
                      />
                    </span>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md = {1}>

          </Grid>
          <Grid item xs = {12} sm = {12} md = {7}>
            <Typography variant = 'h6'>
              Nhận xét về phòng
            </Typography>
            <TextField
              id = 'outlined-multiline-static'
              label = 'Rất mong sự phản hồi của bạn '
              multiline
              rows = '6'
              rowsMax = '6'
              fullWidth
              defaultValue = ''
              className = {classes.textField}
              margin = 'normal'
              variant = 'outlined'
            />

            <Grid container>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' component = 'h2' className = {classes.title}>
                  Sạch sẽ
                </Typography>
                <StarRatings
                  rating = {rating_cleanliness} //index rating
                  starDimension = '28px'
                  starSpacing = '1px'
                  starRatedColor = '#46AFCC'
                  changeRating = {changeRating_cleanliness}
                />
              </Grid>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' component = 'h2' className = {classes.title}>
                  Chất lượng phòng
                </Typography>
                <StarRatings
                  rating = {rating_quality} //index rating
                  starDimension = '28px'
                  starSpacing = '1px'
                  starRatedColor = '#46AFCC'
                  changeRating = {changeRating_quality}
                />
              </Grid>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' className = {classes.title}>
                  Dịch vụ phòng
                </Typography>

                <StarRatings
                  rating = {rating_service} //index rating
                  starDimension = '28px'
                  starSpacing = '1px'
                  starRatedColor = '#46AFCC'
                  changeRating = {changeRating_service}
                />
              </Grid>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' className = {classes.title}>
                  Giá trị
                </Typography>

                <StarRatings
                  rating = {rating_valuable} //index rating
                  starDimension = '28px'
                  starSpacing = '1px'
                  starRatedColor = '#46AFCC'
                  changeRating = {changeRating_valuable}
                />
              </Grid>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' className = {classes.title}>
                  Tổng quan phòng
                </Typography>

                <StarRatings
                  rating = {rating_avg_rating} //index rating
                  starDimension = '28px'
                  starSpacing = '1px'
                  starRatedColor = '#46AFCC'
                  changeRating = {changeRating_avg_rating}
                />
              </Grid>
              <Grid item xs = {12} sm = {6} lg = {12}>
                <Typography variant = 'h5' className = {classes.title}>
                  Bạn có thích phòng này hay không
                </Typography>
                <div>
                  <Radio
                    checked={selectedValue === 1}
                    onChange={(e) => handleToggle(e)}
                    value={1}
                    name="radio-like"
                    aria-label="Like"
                    checkedIcon={<SentimentVerySatisfied color='error'/>}
                    classes={
                      {
                        root: classes.radio
                      }
                    }
                  /><span className={classes.spanLike}>Hài lòng</span>
                  <Radio
                    checked={selectedValue === 0}
                    onChange={(e) => handleToggle(e)}
                    value={0}
                    name="radio-unlike"
                    aria-label="Like"
                    checkedIcon={<SentimentVeryDissatisfied color='error'/>}
                  /><span className={classes.spanLike}>Không hài lòng</span>

                </div>
              </Grid>
            </Grid>
            <Button variant = 'contained' color = 'primary' className = {classes.button}>
                Gửi đánh giá
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(ReviewRoom);
