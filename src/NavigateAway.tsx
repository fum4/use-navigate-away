import { History } from 'history';
import useNavigateAway, { NavigateAwayCallback } from './useNavigateAway';

export interface NavigateAwayProps {
  callback: NavigateAwayCallback;
  history: History;
}

const NavigateAway = ({ callback, history }: NavigateAwayProps) => {
  useNavigateAway(callback, history);

  return null;
};

export default NavigateAway;
