import React from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import FetchError from './FetchError';

class VisibleTodoList extends React.Component {
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}

	fetchData() {
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
	}

	render() {
		const { toggleTodo, todos, isFetching, errorMessage } = this.props;
		if (isFetching && !todos.length) {
			return <p>Loading...</p>;
		}

		if(errorMessage && !todos.length) {
			return (
				<FetchError
					message={errorMessage}
					onRetry={() => this.fetchData()}
				/>
			);
		}

		return (
			<TodoList
				todos={todos}
				onTodoClick={toggleTodo}
			/>
		);
	}
};

const mapStateToProps = (state, { match }) => {
	const filter = match.params.filter || 'all';

	return {
		todos: getVisibleTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		errorMessage: getErrorMessage(state, filter),
		filter,
	}
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
