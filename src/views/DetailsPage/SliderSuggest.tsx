import theme, {ThemeCustom} from '@/components/Theme/Theme';
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


interface IProps extends RouteChildrenProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {},

});

const SliderSuggest: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const {width} = useContext<IGlobalContext>(GlobalContext);

  const {rooms} = state;

  if (rooms == null) {return <SimpleLoader/>}
  const settings: Settings = {
    speed: 500,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: width === 'md' || width === 'lg',
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
