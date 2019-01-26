import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext} from 'react';
import {compose} from 'recompose';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridContainer from '@/layouts/Grid/Container';
import ListRoomCity from '@/layouts/Main/ListRoomCity';
import ListRoomCollection from '@/layouts/Main/ListRoomCollection';

interface IProps {
   classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
	boxListRoom:{
      width:'100%',
      paddingTop: theme!.spacing!.unit! * 5,
      paddingBottom: theme!.spacing!.unit! * 5,
	},
});

// @ts-ignore
const ListRoom: ComponentType<IProps> = (props: IProps) => {
   const {classes} = props;


   return (
   	<Fragment>
   		<div className={classes.boxListRoom}>
   			<GridContainer xs = {11}>
			   	<ListRoomCity/>

               <ListRoomCollection/>
  	     		</GridContainer>
   		</div>
     	</Fragment>
   );
};

export default compose<IProps, any>(
   withStyles(styles),
)(ListRoom);
