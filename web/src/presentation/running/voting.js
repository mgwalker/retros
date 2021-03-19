import React from 'react';

function voting(props) {
  const entriesDOM = [];
  for (let i = 0; i < props.entries.length; i++) {
    const e = props.entries[i];
    entriesDOM.push(
      <div className={`usa-grid voting-option ${e.votes ? 'hot' : ''}`} key={`voting-option-key-${i}`}>
        <div className="usa-width-five-sixths">{e.name}</div>
        <div className="usa-width-one-sixth buttons">
          {e.votes}
          <button onClick={props.voteUp(i)}>+</button>
          <button onClick={props.voteDown(i)}>-</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Voting for {props.voting}</h1>
      <p>
        Click an item to vote for it.  Click again to remove your vote.  You
        may vote on up to five items.
      </p>
      {entriesDOM}
    </div>
  );
}

voting.propTypes = {
  entries: React.PropTypes.array,
  voting: React.PropTypes.string,
  voteUp: React.PropTypes.func,
  voteDown: React.PropTypes.func
};

export default voting;
