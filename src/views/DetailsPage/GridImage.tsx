import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Hidden from '@material-ui/core/Hidden';
import React, {ComponentType, Dispatch, Fragment, MouseEvent, SetStateAction, useContext, useState} from 'react';
import {compose} from 'recompose';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import _ from 'lodash';
// @ts-ignore
import Lightbox from 'react-images';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import ContentLoader from 'react-content-loader';
import PlaceholderLoader from '@/components/PlaceHolder/PlaceholderLoader';

interface IProps {
  classes?: any,
  isOpen?: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const styles: any = (theme: ThemeCustom) => createStyles({
  imageBig: {
    display: 'block',
    position: 'relative',
    float: 'left',
    lineHeight: 0,
    overflow: 'hidden',
    width: '50%',
    [theme!.breakpoints!.down!('sm')]: {
      width: '67%',
    },
    [theme!.breakpoints!.down!('xs')]: {
      width: '100%',
    },
    height: 'auto',
    minHeight: 440,
    maxHeight: '100%',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '0.5px 0.5px 0.5px 0',
    borderColor: '#fff',
  },
  imageSmall: {
    display: 'block',
    position: 'relative',
    lineHeight: 0,
    overflow: 'hidden',
    width: '100%',
    height: '50%',
    maxHeight: 220,
    [theme!.breakpoints!.down!('sm')]: {
      maxHeight: 167.5,
    },
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '0.5px 0.5px 0.5px 0.5px',
    borderColor: '#fff',
  },
  imageProp: {
    objectFit: 'cover',
    border: 0,
    position: 'relative',
    height: '-webkit-fill-available',
    display: 'block',
    maxWidth: '100%',
    width: '100%',
    MozTransition: 'all 0.5s',
    WebkitTransition: 'all 0.5s',
    transition: 'all 0.5s',
    cursor: 'pointer',
    '&:hover': {
      MsTransform: 'scale(1.1)', /* IE 9 */
      WebkitTransform: 'scale(1.1)', /* Safari 3-8 */
      transform: 'scale(1.1)',
    },
  },
  boxImgSmall: {
    width: '25%',
    [theme!.breakpoints!.down!('sm')]: {
      width: '33%',
    },
    float: 'left',
  },

});

const GridImage: ComponentType<IProps> = (props: IProps) => {
  const {classes}                       = props;
  const [currentImage, setCurrentImage] = useState<number>(0);
  const {state}                         = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {room} = state;
  if (room == null) {
    return <PlaceholderLoader />;
  }

  const openLightbox  = (event: MouseEvent<HTMLImageElement>, index: number) => {
    event.preventDefault();
    props.setIsOpen(true);
    setCurrentImage(index);
  };
  const closeLightbox = () => {
    setCurrentImage(0);
    props.setIsOpen(false);
  };

  const ROOM_IMAGES = room ? _.map(room.media.data, o => {
    return {
      src: `http://westay.org/storage/rooms/${o.image}`,
    };
  }) : [];

  return (
    <Fragment>
      <div className = {classes.imageBig}>
        <img src = {`http://westay.org/storage/rooms/${room.media.data[0].image}`} alt = 'Living Room'
             className = {classes.imageProp}
             onClick = {e => openLightbox(e, 0)} />
      </div>
      <Hidden xsDown>
        <div className = {classes.boxImgSmall}>
          <div className = {classes.imageSmall}>
            <img src = {`http://westay.org/storage/rooms/${room.media.data[1].image}`} className = {classes.imageProp}
                 onClick = {e => openLightbox(e, 1)} />
          </div>
          <div className = {classes.imageSmall}>
            <img src = {`http://westay.org/storage/rooms/${room.media.data[2].image}`} className = {classes.imageProp}
                 onClick = {e => openLightbox(e, 2)} />
          </div>
        </div>
      </Hidden>
      <Hidden smDown>
        <div className = {classes.boxImgSmall}>
          <div className = {classes.imageSmall}>
            <img src = {`http://westay.org/storage/rooms/${room.media.data[3].image}`} className = {classes.imageProp}
                 onClick = {e => openLightbox(e, 3)} />
          </div>
          <div className = {classes.imageSmall}>
            <img src = {`http://westay.org/storage/rooms/${room.media.data[4].image}`} className = {classes.imageProp}
                 onClick = {e => openLightbox(e, 4)} />
          </div>
        </div>
      </Hidden>
      <Lightbox
        images = {ROOM_IMAGES}
        isOpen = {props.isOpen}
        onClickPrev = {() => {
          setCurrentImage(currentImage - 1);
        }}
        onClickNext = {() => {
          setCurrentImage(currentImage + 1);
        }}
        rightArrowTitle = 'Next'
        leftArrowTitle = 'Previous'
        onClose = {closeLightbox}
        currentImage = {currentImage}
        showThumbnails = {true}
        onClickThumbnail = {(index: number) => setCurrentImage(index)}
      />
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(GridImage);
