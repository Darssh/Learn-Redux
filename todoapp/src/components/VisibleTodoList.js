import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const getVisibleTodos = ( todos, filter ) => {
	switch(filter) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter(
				t => !t.completed
			);
		case 'completed':
			return todos.filter(
				t => t.completed
			);
	}
};

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    ownProps.filter
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
