import React from 'react';
import { Switch } from 'react-router-dom';

import CalculateDistancesMap from '../pages/CalculateDistancesMap';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={CalculateDistancesMap} />
    </Switch>
  );
};

export default Routes;
