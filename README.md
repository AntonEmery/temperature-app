### Local Development Setup
````
git clone https://github.com/AntonEmery/temperature-app
cd temperature-app
npm install
npm start
open http://localhost:3000
````

### Running Tests
````
npm test
````

### Project Details
  This application allows users to view temperature data from a select group of cities around the world. Users can switch between Celsius and Fahrenheit at will. The app displays the maximum and minimum temperatures for a single day, as well as the average temperatures every day over a 6 day period, and the single average for a given week.

### Problems Encountered
  - The weather API would not let me query past 6 days prior without a paid plan. The project spec asked for 7 days worth of data. I mentioned this and was told to go ahead and complete the user story with the data I had available.

  - I was also told to omit the task of displaying the month aggregation as that did not make sense given 6 days of data, and that this was being corrected in the challenge.

### Libraries Used
- [Create React App](https://github.com/facebookincubator/create-react-app)
  - this allowed me to get started quickly without worrying about tooling or setup
- [Moment.js](https://momentjs.com/)
  - For easy manipulation of dates when calculating past days for API call.
- [React Easy Chart](https://rma-consulting.github.io/react-easy-chart/)
  - D3 charts designed for ease of use with React
- [Enzyme](http://airbnb.io/enzyme/docs/installation/index.html)/[Jest](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
  - used for writing basic snapshot tests for my React components

