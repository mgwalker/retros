import React from 'react';

function getReady(props) {
  return (
    <div className="usa-grid">
      <h1>Retro Starting in...</h1>
      <div className="retro-countdown-timer">{props.timeBeforeStart}</div>
    </div>
  );
}

getReady.propTypes = {
  timeBeforeStart: React.PropTypes.number
};

export default getReady;
