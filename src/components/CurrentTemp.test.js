import React from 'react';
import renderer from 'react-test-renderer';
import CurrentTemp from './CurrentTemp';

it('Current temp renders when temp is passed in as props', () => {
  const currentTemp = 30;
  const tree = renderer.create(<CurrentTemp currentTemp={currentTemp} />).toJSON();
  expect(tree).toMatchSnapshot();
});
