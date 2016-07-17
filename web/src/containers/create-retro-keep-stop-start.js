import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Presentation from '../presentation/create-retro-keep-stop-start';

import { Retro } from '../actions';

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    launch() {
      dispatch(Retro.setRetroCategories(['Keep Doing', 'Stop Doing', 'Start Doing']));
      hashHistory.push('/set-retro-properties');
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
