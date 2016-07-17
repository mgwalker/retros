import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Presentation from '../presentation/get-retro-properties';

import { Retro } from '../actions';

function mapStateToProps(state) {
  return state.retro;
}

function mapDispatchToProps(dispatch) {
  return {
    changeTotalTime(event) {
      dispatch(Retro.setTotalTime(event.target.value));
    },
    changeCategorySelfTime(category) {
      return event => {
        dispatch(Retro.setCategorySelfTime(category, event.target.value));
      };
    },
    changeCategoryVoteTime(category) {
      return event => {
        dispatch(Retro.setCategoryVoteTime(category, event.target.value));
      };
    },
    acceptProperties() {
      hashHistory.push('/enable-retro-happiness');
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
