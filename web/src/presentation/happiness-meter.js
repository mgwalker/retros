import React from 'react';

function happinessMeter(props) {
  return (
    <div className="usa-grid happiness-meter">

      <h1>Happiness Meter</h1>
      <p>
        Click the button below that best represents how you feel about this
        retro period.  This is used to help gauge how the team feels overall.
      </p>

      <button className="usa-width-one-third happiness-meter-sad" onClick={props.onSadClicked}>
        <span>☹️</span><br />
        Not feeling that great.
      </button>

      <button className="usa-width-one-third happiness-meter-neutral" onClick={props.onNeutralClicked}>
        <span>😐</span><br />
        Doing just fine for now.
      </button>

      <button className="usa-width-one-third happiness-meter-happy" onClick={props.onHappyClicked}>
        <span>😃</span><br />
        Feeling good about it!
      </button>
    </div>
  );
}

happinessMeter.propTypes = {
  onSadClicked: React.PropTypes.func,
  onNeutralClicked: React.PropTypes.func,
  onHappyClicked: React.PropTypes.func
};

export default happinessMeter;
