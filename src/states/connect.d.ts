import { AppStoreState } from './app';
import { HomeStoreState } from 'pages/home/state';

export interface ConnectState {
  app: AppStoreState;
  home: HomeStoreState;
}
