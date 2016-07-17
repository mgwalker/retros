import React from 'react';
import CategoryTime from './set-retro-category-time';

function displayTime(minutes) {
  const wholeMinutes = Math.floor(minutes);
  const seconds = Math.round((minutes - wholeMinutes) * 60);
  return `${wholeMinutes} minutes${seconds > 0 ? ` and ${seconds} seconds` : ''}`;
}

function GetRetroProperties(props) {
  return (
    <div>
      <h1>Setup Retro Properties</h1>

      <div className="usa-grid">
        <p>
          Now we need to setup the timing properties of your retro.  You can specify
          a total length of time the retro should run and we&apos;ll automatically
          fill in the length of time to display each category and voting, or you
          can fill in those individual values yourself.  This time is evenly divided
          for each category.  Your retro cannot be shorter
          than {displayTime(props.minimumTime)}, so that participants can
          answer each category for at least one minute, and vote on each for at
          least 30 seconds.
        </p>

        <h2>Total retro time, in minutes:</h2>

        <p>
          <input type="number" min={props.minimumTime} step="1.0" value={props.totalTime} onChange={props.changeTotalTime}></input>
        </p>

        <button className="usa-button-big" onClick={props.acceptProperties}>Accept</button>
        Create a standup that runs for {displayTime(props.totalTime)}

      </div>

      <hr />

      <div className="usa-grid">
        <p>
          If you want finer-grained control, you can set the times for each category
          below.  Note that answer times must be at least one minute and voting
          times must be at least 0.5 minutes (30 seconds).
        </p>

        {props.categories.map(c =>
          <CategoryTime category={c} times={props.categoryTimes[c]} key={`retro_props_category_${c}`} onChangeSelfTime={props.changeCategorySelfTime(c)} onChangeVoteTime={props.changeCategoryVoteTime(c)} />
        )}

        <button className="usa-button-big" onClick={props.acceptProperties}>Accept</button>
        Create a standup that runs for {displayTime(props.totalTime)}
      </div>
    </div>
  );
}

GetRetroProperties.propTypes = {
  categories: React.PropTypes.array.isRequired,
  minimumTime: React.PropTypes.number.isRequired,
  totalTime: React.PropTypes.string.isRequired,
  categoryTimes: React.PropTypes.object.isRequired,
  changeTotalTime: React.PropTypes.func.isRequired,
  changeCategorySelfTime: React.PropTypes.func.isRequired,
  changeCategoryVoteTime: React.PropTypes.func.isRequired,
  acceptProperties: React.PropTypes.func.isRequired
};

export default GetRetroProperties;
