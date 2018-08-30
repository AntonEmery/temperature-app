import React from 'react';
import PropTypes from 'prop-types';
import CurrentTemp from './CurrentTemp';
import MeanTemp from  './MeanTemp';

function DataWrapper({ temp_c, temp_f, maxtemp_c, mintemp_c }) {

    return (
      <div>
        <CurrentTemp temp_c={temp_c} temp_f={temp_f} />
        <MeanTemp maxtemp_c={maxtemp_c} mintemp_c={mintemp_c} />
      </div>
    )
}

export default DataWrapper;