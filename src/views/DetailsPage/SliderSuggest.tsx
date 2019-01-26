import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useContext} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import RoomCardSlider from '@/components/Rooms/RoomCardSlider';
import NextArrowSlider from '@/views/DetailsPage/NextArrowSlider';
import PrevArrowSlider from '@/views/DetailsPage/PrevArrowSlider';


interface IProps extends RouteChildrenProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  nextArrow:{

  }
});

const SliderSuggest: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  // const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const {width} = useContext<IGlobalContext>(GlobalContext);

  const settings: Settings = {
    speed: 500,
    dots: width === 'xs' || width === 'sm',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: width === 'md' || width === 'lg',
    nextArrow: <NextArrowSlider />,
    prevArrow: <PrevArrowSlider />,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay:true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          infinite: true,
          dots: true,
          autoplay:true,
          autoplaySpeed: 5000,
        }
      },
    ]
  };

  return (
    <div className = {classes.root}>
      <Slider {...settings}>
          <RoomCardSlider/>
          <RoomCardSlider/>
          <RoomCardSlider/>
          <RoomCardSlider/>
          <RoomCardSlider/>
      </Slider>
    </div>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(SliderSuggest);
