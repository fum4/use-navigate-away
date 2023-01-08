import { History } from 'history';

import NavigateAway, { NavigateAwayProps } from './NavigateAway';
import useNavigateAway, { NavigateAwayCallbackParams, NavigateAwayCallback } from './useNavigateAway';

const configureNavigateAway = (history: History) => {
  const NavigateAwayWithHistory = (props: NavigateAwayProps) => (
    <NavigateAway history={history} {...props} />
  );

  return {
    NavigateAway: NavigateAwayWithHistory,
    useNavigateAway: (callback: NavigateAwayCallback, _history?: History) => useNavigateAway(callback, _history || history),
  };
};

export type { NavigateAwayProps, NavigateAwayCallback, NavigateAwayCallbackParams };

export default configureNavigateAway;
