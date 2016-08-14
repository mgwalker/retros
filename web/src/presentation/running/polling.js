import React from 'react';

function polling(props) {
  const entriesDOM = [];
  for (let i = 0; i < props.entries.length; i++) {
    const e = props.entries[i];
    entriesDOM.push(<input type="text" key={`polling-input-key-${i}`} value={e} onChange={props.editEntry(i)} />);
  }

  return (
    <div>
      <h1>Polling for {props.polling}</h1>
      {entriesDOM}
    </div>
  );
}

polling.propTypes = {
  entries: React.PropTypes.array,
  polling: React.PropTypes.string,
  editEntry: React.PropTypes.func
};

export default polling;
