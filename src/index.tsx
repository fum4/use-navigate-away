import React from 'react';
import type { History } from 'history';

import { NavigateAwayProps, NavigateAwayCallbackParams, NavigateAwayCallback } from './types';
import useNavigateAway from './useNavigateAway';

const configureNavigateAway = (history: History) => {
  const NavigateAway = (props: NavigateAwayProps): null => {
    useNavigateAway(props.callback, props.history || history);
    return null;
  }

  return {
    NavigateAway,
    useNavigateAway: (callback: NavigateAwayCallback, _history?: History) => useNavigateAway(callback, _history || history),
  };
};

export * from './types';
export default configureNavigateAway;
