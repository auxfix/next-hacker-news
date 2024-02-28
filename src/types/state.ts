import React from 'react';
import { HackerStory } from '@/features/news/types';

import { AlertPosition, Icons } from './common';

export interface AlertData {
  icon: Icons;
  id: string;
  message: React.ReactNode;
  position: AlertPosition;
  timeout: number;
  variant: any;
}

export interface AlertsState {
  data: AlertData[];
}

export interface AppState {
  query: string;
}

export interface RootState {
  alerts: AlertsState;
  news: NewsState;
}

export interface WithDispatch {
  dispatch: any;
}

export interface NewsState {
  isLoading: boolean;
  news: Array<HackerStory>;
}
