import React from 'react';

function getPollingBlock(polling, entries, editHandler) {
  if (polling) {
    const entriesDOM = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      entriesDOM.push(<input type="text" key={`polling-input-key-${i}`} value={e} onChange={editHandler(i)} />);
    }

    return (
      <div>
        <h1>Polling for {polling}</h1>
        {entriesDOM}
      </div>
    );
  }
  return null;
}

function getVotingBlock(voting) {
  if (voting) {
    return (
      <h1>Voting for {voting}</h1>
    );
  }
  return null;
}

function getTimeWarningBlock(timeWarning) {
  if (timeWarning > 0) {
    return (<div style={{ position: 'fixed', top: 0, right: 0, backgroundColor: 'red' }}>{timeWarning} seconds remaining</div>);
  }
  return null;
}

function runningRetro(props) {
  return (
    <div className="usa-grid">
      {getPollingBlock(props.polling, props.entries, props.editEntry)}
      {getVotingBlock(props.voting, props.entries)}
      {getTimeWarningBlock(props.timeWarning)}
    </div>
  );
}

runningRetro.propTypes = {
  polling: React.PropTypes.string,
  voting: React.PropTypes.string,
  entries: React.PropTypes.array,
  editEntry: React.PropTypes.func.isRequired,
  timeWarning: React.PropTypes.number
};

export default runningRetro;
