import React from 'react';

function RunningRetroLayout(props) {
  return (
    <div className="usa-grid">
      <div className="retro-running-layout">
        <div className="timer-container">
          {props.durationRemaining} second{props.durationRemaining === 1 ? '' : 's'} remaining
          <div className="timer-countdown-bar" style={{ width: `${100 - props.pctElapsed}%` }} />
        </div>
      </div>
      {props.children}
    </div>
  );
}

RunningRetroLayout.propTypes = {
  children: React.PropTypes.object,
  durationRemaining: React.PropTypes.number,
  pctElapsed: React.PropTypes.number
};

export default RunningRetroLayout;
