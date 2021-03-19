import { connect } from 'react-redux';
import Presentation from '../../presentation/happiness-meter';

import { Retro } from '../../actions';

function mapStateToProps(state) {
  return {
    happinessLevel: state.retro.happinessLevel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSadClicked() {
      console.log('sad :(');
      dispatch(Retro.setHappinessLevel(1));
    },
    onNeutralClicked() {
      console.log('neutral :|');
      dispatch(Retro.setHappinessLevel(2));
    },
    onHappyClicked() {
      console.log('happy :)');
      dispatch(Retro.setHappinessLevel(3));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
