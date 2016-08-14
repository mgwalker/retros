import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Presentation from '../presentation/create-retro-like-wish-if';

import { Retro } from '../actions';

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    launch() {
      dispatch(Retro.setRetroCategories(['I Like', 'I wish', 'What If']));
      browserHistory.push('/set-retro-properties');
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
