import { useRef, useLayoutEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import type { Update, History } from 'history';

import { NavigateAwayCallback } from './types';

const useNavigateAway = (callback: NavigateAwayCallback, history: History) => {
  const navigate = useNavigate();
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useLayoutEffect(() => {
    const navigateAway: NavigateFunction = (...args) => {
      navigatedFromCallback = true;
      // @ts-ignore
      navigate(...args);
    };

    let navigatedFromCallback = false;

    return history.listen(({ action, location }: Update) => {
      if (!navigatedFromCallback) {
        callbackRef.current?.({
          navigate: navigateAway,
          nextLocation: location,
          action,
        });
      }
    });
  }, [ navigate ]);
};

export default useNavigateAway;
