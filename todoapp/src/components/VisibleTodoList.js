import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const getVisibleTodos = ( todos, filter ) => {
	switch(filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(
				t => !t.completed
			);
		case 'SHOW_COMPLETED':
			return todos.filter(
				t => t.completed
			);
	}
};

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
