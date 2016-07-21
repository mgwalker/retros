import React from 'react';

function getPollingBlock(polling) {
  console.log(`getPollingBlock: ${polling}`);
  if (polling) {
    return (
      <h1>Polling for {polling}</h1>
    );
  }
  return null;
}

function getVotingBlock(voting) {
  if (voting.category) {
    return (
      <h1>Voting for {voting.category}</h1>
    );
  }
  return null;
}

function runningRetro(props) {
  return (
    <div className="usa-grid">
      {getPollingBlock(props.polling)}
      {getVotingBlock(props.voting)}
    </div>
  );
}

runningRetro.propTypes = {
  polling: React.PropTypes.string,
  voting: React.PropTypes.object.isRequired
};

export default runningRetro;
