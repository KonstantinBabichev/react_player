import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp.react';
//import {data} from './components/data';

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);


//React.render(<SearchableTable data={data}/>, document.getElementById('searchableTable'));