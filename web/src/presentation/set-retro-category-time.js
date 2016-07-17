import React from 'react';

function SetRetroCategories(props) {
  return (
    <div className="set-retro-category-time">
      <h3>{props.category}</h3>
      <div className="usa-grid">
        <div className="usa-width-one-half">
          <h4>Answer Time</h4>
          <input type="number" value={props.times.selfTime} min="1.0" step="0.1" onChange={props.onChangeSelfTime} />
          <p>
            This is the number of minutes that retro participants can spend
            filling in their answers for the {props.category} category.
          </p>
        </div>

        <div className="usa-width-one-half">
          <h4>Vote Time</h4>
          <input type="number" value={props.times.voteTime} min="0.5" step="0.1" onChange={props.onChangeVoteTime} />
          <p>
            This is the number of minutes retro participants will spend voting
            on answers in this cateogry.
          </p>
        </div>
      </div>
    </div>
  );
}

SetRetroCategories.propTypes = {
  category: React.PropTypes.string.isRequired,
  times: React.PropTypes.object.isRequired,
  onChangeSelfTime: React.PropTypes.func.isRequired,
  onChangeVoteTime: React.PropTypes.func.isRequired
};

export default SetRetroCategories;
