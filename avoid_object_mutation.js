/*
  Libraries used:
  <script src="https://cdnjs.cloudflare.com/ajax/libs/expect/1.20.2/expect.min.js"></script>
  <script src="https://wzrd.in/standalone/deep-freeze@latest"></script>
*/

const toggleTodo = (todo) => {
  return Object.assign({}, todo , {
    completed: !todo.completed
    /*
      Object Spread only enable in bable
      {
        ...todo,
        completed: !todo.completed
      }
    */
  });
};


const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };
  
  deepFreeze(todoBefore);
  
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('Test Passed!');

