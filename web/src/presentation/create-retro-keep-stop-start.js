import React from 'react';

function CreateRetroKeepStopStart(props) {
  return (
    <div>
      <div className="usa-grid">
        <h2 className="usa-width-one-whole">Keep Doing/Stop Doing/Start Doing</h2>
        <div className="usa-width-two-thirds">
          This traditional retro format asks participants to list some things
          that are working well and the team should keep doing, some things
          that aren&apos;t working so well and the team should consider
          stopping, and some things that perhaps the team should start doing.
        </div>
        <div className="usa-width-one-third">
          <button onClick={props.launch}>Go</button>
        </div>
      </div>
    </div>
  );
}

CreateRetroKeepStopStart.propTypes = {
  launch: React.PropTypes.func.isRequired
};

export default CreateRetroKeepStopStart;
