import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Dispatch, Fragment, MouseEvent, SetStateAction, useState} from 'react';
import {compose} from 'recompose';
import imgRoomDemo from '@/assets/room_demo.jpeg';
import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import imgRoomDemo4 from '@/assets/room_demo4.jpeg';
import imgRoomDemo5 from '@/assets/room_demo5.jpeg';
import imgRoomDemo6 from '@/assets/room_demo6.jpeg';
// @ts-ignore
import Lightbox from 'react-images';

interface IProps {
    classes?: any,
    isOpen?:boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const styles: any = (theme: ThemeCustom) => createStyles({
    galleryImage:{
        overflow:'hidden',
        height:'100%',
    },
    imageBig:{
        display: 'block',
        position: 'relative',
        float: 'left',
        lineHeight: 0,
        overflow: 'hidden',
        width: '50%',
        height:'auto',
        maxHeight:'100%',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: '0.5px 1px 0.5px 0',
        borderColor: '#fff',
    },
    imageSmall:{
        display: 'block',
        float: 'left',
        position: 'relative',
        lineHeight: 0,
        overflow: 'hidden',
        width: '25%',
        height: '50%',
        maxHeight: '50%',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: '0.5px 0.5px 0.5px 0px',
        borderColor: '#fff',
    },
    imageProp:{
        border: 0,
        position: 'relative',
        height: 'auto',
        display: 'block',
        maxWidth: '100%',
        width: 'auto',
        MozTransition: 'all 0.5s',
        WebkitTransition: 'all 0.5s',
        transition: 'all 0.5s',
        cursor:'pointer',
        '&:hover':{
            MsTransform: 'scale(1.2)', /* IE 9 */
            WebkitTransform: 'scale(1.2)', /* Safari 3-8 */
            transform: 'scale(1.2)',
        },
    },

});

const GridImage:ComponentType<IProps> = (props: IProps) => {
    const {classes} = props;
    const [currentImage,setCurrentImage] = useState<number>(0);

    const openLightbox = (event:MouseEvent<HTMLImageElement>,index:number ) =>{
        event.preventDefault();
        props.setIsOpen(true);
        setCurrentImage(index);
    };
    const closeLightbox = () => {
        setCurrentImage(0);
        props.setIsOpen(false)
    };

    const ROOM_IMAGES = [
        {
            src: imgRoomDemo,
            caption: 'Living Room',
            alt: 'Living Room',
        },
        {
            src: imgRoomDemo2,
            alt: 'Living Room',
            caption: 'A forest'
        },
        {
            src: imgRoomDemo4,
            alt: 'Living Room',
            caption: 'A forest'
        },
        {
            src: imgRoomDemo5,
            alt: 'Living Room',
            caption: 'A forest'
        },
        {
            src: imgRoomDemo6,
            alt: 'Living Room',
            caption: 'A forest'
        },
    ];

    return (
        <Fragment>
            <div className={classes.galleryImage}>
                <div className={classes.imageBig}>
                    <img src={imgRoomDemo} alt='Living Room' className={classes.imageProp}
                         onClick={e => openLightbox(e,0)}/>
                </div>
                <div className={classes.imageSmall}>
                    <img src={imgRoomDemo2} className={classes.imageProp}
                         onClick={e => openLightbox(e,1)}/>
                </div>
                <div className={classes.imageSmall}>
                    <img src={imgRoomDemo4} className={classes.imageProp}
                         onClick={e => openLightbox(e,2)}/>
                </div>
                <div className={classes.imageSmall}>
                    <img src={imgRoomDemo5} className={classes.imageProp}
                         onClick={e => openLightbox(e,3)}/>
                </div>
                <div className={classes.imageSmall}>
                    <img src={imgRoomDemo6} className={classes.imageProp}
                         onClick={e => openLightbox(e,4)}/>
                </div>
                <Lightbox
                    images={ROOM_IMAGES}
                    isOpen={props.isOpen}
                    onClickPrev={()=>{setCurrentImage(currentImage -1)}}
                    onClickNext={()=>{setCurrentImage(currentImage +1)}}
                    rightArrowTitle='Next'
                    leftArrowTitle='Previous'
                    onClose={closeLightbox}
                    currentImage={currentImage}
                    showThumbnails={true}
                    onClickThumbnail={(index: number) => setCurrentImage(index)}
                />
            </div>
        </Fragment>
    );
};

export default compose<IProps, any>(
    withStyles(styles),
)(GridImage);
