import { connect } from 'react-redux';
import Presentation from '../presentation/enable-retro-happiness';

import { Retro, Activity } from '../actions';

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    clickHandler(enabled) {
      return () => {
        dispatch(Retro.setHappiness(enabled));
        dispatch(Activity.createRetro());
      };
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
