import { connect } from 'react-redux';
import Presentation from '../../presentation/running/voting';
import { Activity } from '../../actions';

function mapStateToProps(state) {
  return {
    voting: state.activity.voting,
    entries: state.activity.entries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp(index) {
      return () => {
        dispatch(Activity.voteUp(index));
      };
    },

    voteDown(index) {
      return () => {
        dispatch(Activity.voteDown(index));
      };
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
