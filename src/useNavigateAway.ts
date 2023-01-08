import { useRef, useLayoutEffect } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
import { type Action, type Update, type Location } from 'history';

export interface NavigateAwayCallbackParams {
  action: Action;
  nextLocation: Location;
  navigate: NavigateFunction;
}

export type NavigateAwayCallback = ({ action, nextLocation }: NavigateAwayCallbackParams) => void;

// Do not use to block navigation
const useNavigateAway = (callback: NavigateAwayCallback, history) => {
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
