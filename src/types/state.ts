import React from 'react';
import { HackerStory } from 'feature/news/types';
import { Dispatch } from 'redux';
import { Variants } from 'styled-minimal/lib/types';

import { AlertPosition, Icons } from './common';

export interface AlertData {
  icon: Icons;
  id: string;
  message: React.ReactNode;
  position: AlertPosition;
  timeout: number;
  variant: Variants;
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
  dispatch: Dispatch;
}

export interface NewsState {
  isLoading: boolean;
  news: Array<HackerStory>;
}
