import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

// ReactDOM.render(<App text="Hello World"/>, document.getElementById('app'));
ReactDOM.render(
  <Board grid_size='4'/>,
  document.getElementById('app')
);