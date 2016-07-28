import { connect } from 'react-redux';
import Presentation from '../presentation/running-retro';
import { Activity } from '../actions';

function mapStateToProps(state) {
  return {
    polling: state.activity.polling,
    voting: state.activity.voting,
    timeWarning: state.activity.timeWarning,
    entries: state.activity.entries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editEntry(index) {
      return event => {
        dispatch(Activity.setPollEntry(index, event.target.value));
      };
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
