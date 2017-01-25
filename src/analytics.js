import ga from 'react-ga';
import { NODE_ENV } from './env';

if (NODE_ENV !== 'test') {
  ga.initialize('UA-74107295-1', { debug: NODE_ENV === 'development' });
}

export const recordPageview = () => {
  ga.pageview(window.location.pathname);
};

export const recordAction = (action) => {
  ga.event({
    category: 'AppAction',
    action: action
  });
};
