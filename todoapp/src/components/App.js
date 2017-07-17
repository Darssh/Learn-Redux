import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const TodoApp = ({ match }) => (
  <div>
  	<AddTodo />
  	<VisibleTodoList
      filter={match.params.filter || 'all'}
   />
    <Footer />
  </div>
);

export default TodoApp;
