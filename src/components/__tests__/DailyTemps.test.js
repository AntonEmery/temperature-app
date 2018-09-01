import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import DailyTemps from '../DailyTemps';

configure({ adapter: new Adapter() });

describe('Daily temp component', () => {
  it('Daily Temps renders correctly given correct props', () => {
    let tempHistory = [
      { tempC: 15, tempF: 80 },
      { tempC: 19, tempF: 75 },
      { tempC: 26, tempF: 60 },
      { tempC: 30, tempF: 65 },
      { tempC: 12, tempF: 80 },
      { tempC: 30, tempF: 55 },
    ]
    let units = 'Celsius'
    const tree = renderer.create(<DailyTemps tempHistory={tempHistory} units={units} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
