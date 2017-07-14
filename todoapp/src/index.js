import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';


let AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
	  	<input ref={node => {
	  		input = node;
	  	}} />
	    <button onClick={() => {
  			dispatch(addTodo(input.value));
	      input.value = '';
	    }}>
	    Add Todo
	    </button>
    </div>
	);
};

AddTodo = connect()(AddTodo);

const Footer = () => (
  <p>
  	Show:
  	{' '}
  	<FilterLink
  		filter='SHOW_ALL'
  	>
  		All
  	</FilterLink>
  	{' '}
  	<FilterLink
  		filter='SHOW_ACTIVE'
  	>
  		Active
  	</FilterLink>
  	{' '}
  	<FilterLink
  		filter='SHOW_COMPLETED'
  	>
  		Completed
  	</FilterLink>
  </p>
);

const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

let nextTodoId = 0;
const TodoApp = () => (
  <div>
  	<AddTodo />
  	<VisibleTodoList />
    <Footer />
  </div>
);

const persistedState = loadState();
const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
