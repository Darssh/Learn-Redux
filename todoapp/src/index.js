import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { todos, visibilityFilter, getVisibleTodos } from './reducers';
import { combineReducers, createStore } from 'redux';

const Todo = ({
	onClick,
	completed,
	text
}) => (
  <li
  	onClick={onClick}
    style={{
    	textDecoration:
    		completed ?
    			'line-through' :
    			'none'
    }}>
    {text}
  </li>
);

const TodoList = ({
	todos,
	onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
    	<Todo
    		key={todo.id}
    		{...todo}
    		onClick={() => onTodoClick(todo.id)}
    	/>
    )}
  </ul>
);

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


const Link = ({
	active,
	children,
	onClick
}) => {
	if (active) {
		return <span>{children}</span>
	}

	return (
		<a href='#'
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{children}
		</a>
	)
};

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active:
      ownProps.filter ===
      state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  };
};

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);


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

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

const toggleTodo = (id) => {
  return {
    type:'TOGGLE_TODO',
    id
  };
};

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
}

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
}

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);


let nextTodoId = 0;
const TodoApp = () => (
  <div>
  	<AddTodo />
  	<VisibleTodoList />
    <Footer />
  </div>
);


ReactDOM.render(
  <Provider store={createStore(todoApp)} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
