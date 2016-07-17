import { connect } from 'react-redux';
import Presentation from '../presentation/do-retro';

import { Retro } from '../actions';

function mapStateToProps(state) {
  return {
    owner: state.owner,
    retro: state.retro
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername(username) {
      dispatch(Retro.setUsername(username));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
