import React from 'react';

function CreateRetroLikeWishIf(props) {
  return (
    <div>
      <div className="usa-grid">
        <h2 className="usa-width-one-whole">I Like/I Wish/What If</h2>
        <div className="usa-width-two-thirds">
          In this retro format, participants list some things that they like
          from the most recent period, some things they wish to see, and
          some ideas they want to introduce to the team about things they
          are thinking about doing.
        </div>
        <div className="usa-width-one-third">
          <button onClick={props.launch}>Go</button>
        </div>
      </div>
    </div>
  );
}

CreateRetroLikeWishIf.propTypes = {
  launch: React.PropTypes.func.isRequired
};

export default CreateRetroLikeWishIf;
