import {LocationDescriptorObject, History} from 'history';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import {createContext} from 'react';

export const GlobalContext = createContext<IGlobalContext | any>(null);

export interface IGlobalContext {
  location: LocationDescriptorObject,
  history: History
  width: Breakpoint
}
