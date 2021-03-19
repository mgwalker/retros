import React from 'react';

function getResults(resultList) {
  const results = [];
  for (const result of resultList) {
    results.push(
      <div key={`retro-results-${result.name}`}>
        <div className="usa-width-one-twelfth">{result.votes}</div>
        <div>{result.name}</div>
      </div>
    );
  }
  return results;
}

function getResultGroup(groupName, results) {
  return (
    <div key={`retro-result-group-${groupName}`}>
      <h2>{groupName}</h2>
      <div className="usa-grid">
        {getResults(results[groupName])}
      </div>
    </div>
  );
}

function getAllResultGroups(results) {
  const groups = [];
  if (typeof results !== 'undefined') {
    for (const name of Object.keys(results)) {
      groups.push(getResultGroup(name, results));
    }
  }
  return groups;
}

function getHappinessHistogram(histogram) {
  if (histogram) {
    return (
      <div>
        <h3>Retro Happiness</h3>
        <div className="usa-grid">
          <div className="usa-width-one-third">
            ☹️<br />{histogram[1]}
          </div>
          <div className="usa-width-one-third">
            😐<br />{histogram[2]}
          </div>
          <div className="usa-width-one-third">
            😃<br />{histogram[3]}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function retroResults(props) {
  return (
    <div className="usa-grid">
      <h1>Retro Results</h1>
      {getAllResultGroups(props.results.entries)}
      {getHappinessHistogram(props.results.happinessHistogram)}
    </div>
  );
}

retroResults.propTypes = {
  results: React.PropTypes.object.isRequired
};

export default retroResults;
