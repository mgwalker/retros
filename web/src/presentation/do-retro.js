import React from 'react';

class DoRetro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.changeUsername = (event) => {
      this.setState({ username: event.target.value });
    };

    this.submitUsername = () => {
      this.props.onChangeUsername(this.state.username);
    };
  }

  getOwnerBlock() {
    if (this.props.owner) {
      const url = window.location.href.substr(0, window.location.href.indexOf('?'));
      return (
        <div className="usa-grid retro-owner-block">
          <div className="usa-width-one-half desc">
            Share this link with your retro participants so they can
            join: <a href={url}>{url}</a>
          </div>
          <div className="usa-width-one-half btn">
            <button onClick={this.props.onStartRetro}>Start the Retro</button>
          </div>
        </div>
      );
    }
    return null;
  }

  getUserBlock() {
    if (this.props.retro.username) {
      return (
        <div className="usa-grid">
          <h2>These users have joined:</h2>
          {this.props.retro.users.map(user => <div className="usa-width-one-sixth" key={`retro-awaiting-user-${user}`}>{user}</div>)}
        </div>
      );
    }

    return (
      <div className="usa-grid">
        <h2>Enter your name</h2>
        <input type="text" value={this.state.username} onChange={this.changeUsername} />
        <button onClick={this.submitUsername}>Submit</button>
        <p>
          This is so {this.props.owner ? 'participants' : 'the facilitator'} knows
          who all has joined and is ready to go.
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="usa-grid">
        <h1>Retro</h1>
        {this.getOwnerBlock()}
        {this.getUserBlock()}
      </div>
    );
  }
}

DoRetro.propTypes = {
  owner: React.PropTypes.bool.isRequired,
  retro: React.PropTypes.object.isRequired,
  onChangeUsername: React.PropTypes.func.isRequired,
  onStartRetro: React.PropTypes.func.isRequired
};

export default DoRetro;
