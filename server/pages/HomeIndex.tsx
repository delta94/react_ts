import {RouterProps, RouteChildrenProps} from 'react-router';
import React, {ComponentType, useReducer} from 'react';
import {Request} from 'express';
import RoomIndex from '@/views/Rooms';
import {WithWidth} from '@material-ui/core/withWidth/withWidth';
import AppWrapper from '@server/wrapper/AppWrapper';
import {
  RoomIndexState,
  RoomIndexAction,
  RoomIndexReducer,
  RoomIndexStateInit, RoomIndexContext,
} from '@/store/context/Room/RoomIndexContext';
import RoomListing from '@/views/Rooms/RoomListing';
import {RoomMapState, RoomMapAction, RoomMapReducer, RoomMapStateInit} from '@/store/context/Room/RoomMapContext';
import RoomListingDetails from '@/views/Rooms/RoomListingDetails';

interface IProps {
  req: Request
  roomState: RoomIndexState
}

// @ts-ignore
export const HomeIndex: ComponentType<IProps> = (props: IProps) => {
  const {req, roomState}        = props;
  const [state, dispatch]       = useReducer<RoomIndexState, RoomIndexAction>(RoomIndexReducer, roomState);
  const [mapState, mapDispatch] = useReducer<RoomMapState, RoomMapAction>(RoomMapReducer, RoomMapStateInit);

  return (
    <AppWrapper req = {req}>
      <RoomIndexContext.Provider value = {{state, dispatch}}>
        <RoomListingDetails />
      </RoomIndexContext.Provider>
    </AppWrapper>
  );
};

