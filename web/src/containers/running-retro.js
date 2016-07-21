import { connect } from 'react-redux';
import Presentation from '../presentation/running-retro';

function mapStateToProps(state) {
  console.log('runnin-retro: mapStateToProps');
  return {
    polling: state.activity.polling,
    voting: state.activity.voting,
    timeWarning: state.activity.timeWarning
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
