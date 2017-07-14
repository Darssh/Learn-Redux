import React from 'react';
import { connect } from 'react-redux';
import { getVisibleTodos } from './reducers';

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

const toggleTodo = (id) => ({
  type:'TOGGLE_TODO',
  id
});

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
});

const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});

export default connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);
