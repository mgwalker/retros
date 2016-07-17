import React from 'react';
import { Activity } from '../actions';

import CreateRetro from './create-retro';
import GetRetroProperties from '../containers/get-retro-properties';

function getActivityComponent(activity) {
  switch (activity) {
    case Activity.CreateRetro:
      return (<CreateRetro />);
    case Activity.GetRetroProperties:
      return (<GetRetroProperties />);
    default:
      return null;
  }
}

function Main(props) {
  return (
    <div className="usa-grid">
      {getActivityComponent(props.activity)}
    </div>
  );
}

Main.propTypes = {
  activity: React.PropTypes.string.isRequired
};

export default Main;
