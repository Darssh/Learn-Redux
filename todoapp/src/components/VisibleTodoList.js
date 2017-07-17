import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(
    state,
    match.params.filter || 'all'
  ),
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;