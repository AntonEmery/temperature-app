import React from 'react';
import ReactDOM from 'react-dom';
import CurrentTemp from './CurrentTemp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentTemp currentTemp="85" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
