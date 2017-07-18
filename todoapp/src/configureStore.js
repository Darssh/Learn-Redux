import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/index';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk];
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
