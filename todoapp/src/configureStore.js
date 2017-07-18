import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/index';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

const configureStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    todoApp,
    applyMiddleware(...middlewares),
  );
  return store;
};

export default configureStore;
