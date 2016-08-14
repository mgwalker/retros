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

function getVotingBlock(voting, entries, voteUp, voteDown) {
  if (voting) {
    const entriesDOM = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      entriesDOM.push(
        <div className={`usa-grid voting-option ${e.votes ? 'hot' : ''}`} key={`voting-option-key-${i}`}>
          <div className="usa-width-five-sixths">{e.name}</div>
          <div className="usa-width-one-sixth buttons">
            {e.votes}
            <button onClick={voteUp(i)}>+</button>
            <button onClick={voteDown(i)}>-</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>Voting for {voting}</h1>
        <p>
          Click an item to vote for it.  Click again to remove your vote.  You
          may vote on up to five items.
        </p>
        {entriesDOM}
      </div>
    );
  }
  return null;
}

function getTimeBlock(time) {
  if (time.durationRemaining > 0) {
    return (<div style={{ position: 'fixed', top: 0, right: 0, backgroundColor: 'red' }}>{time.durationRemaining} seconds remaining</div>);
  }
  return null;
}

function runningRetro(props) {
  return (
    <div className="usa-grid">
      {getPollingBlock(props.polling, props.entries, props.editEntry)}
      {getVotingBlock(props.voting, props.entries, props.voteUp, props.voteDown)}
      {getTimeBlock(props.time)}
    </div>
  );
}

runningRetro.propTypes = {
  polling: React.PropTypes.string,
  voting: React.PropTypes.string,
  entries: React.PropTypes.array,
  editEntry: React.PropTypes.func.isRequired,
  voteUp: React.PropTypes.func.isRequired,
  voteDown: React.PropTypes.func.isRequired,
  time: React.PropTypes.object
};

export default runningRetro;
