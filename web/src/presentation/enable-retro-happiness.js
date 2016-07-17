import React from 'react';

function enableRetroHappiness(props) {
  return (
    <div>
      <h1>Check Happiness?</h1>

      <div className="usa-grid">
        <p>
          As part of the retro, we can ask participants to rate how happy they
          are.  They&apos;ll see a scale like the one below and have a chance
          to click on whichever smiley face best represents how they feel.  The
          total happiness score will be calculated at the end, along with a
          smiley face histogram.
        </p>
      </div>

      <div className="usa-grid" style={{ border: '1px solid black' }}>
        <div className="usa-width-one-third" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '120px' }}>☹️</span><br />
          Not feeling that great.
        </div>

        <div className="usa-width-one-third" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '120px' }}>😐</span><br />
          Doing okay. Nothing major to report.
        </div>

        <div className="usa-width-one-third" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '120px' }}>😃</span><br />
          Feeling good about it!
        </div>
      </div>

      <div className="usa-grid">
        <h2>Do you want to include the happiness meter in your retro?</h2>

        <button className="usa-button-big" onClick={props.clickHandler(true)}>Yes</button>
        <button className="usa-button-secondary usa-button-big" onClick={props.clickHandler(false)}>No</button>
      </div>
    </div>
  );
}

enableRetroHappiness.propTypes = {
  clickHandler: React.PropTypes.func.isRequired
};

export default enableRetroHappiness;
