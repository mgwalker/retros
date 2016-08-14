import { connect } from 'react-redux';
import Presentation from '../../presentation/running/get-ready';

function mapStateToProps(state) {
  return {
    timeBeforeStart: state.activity.timeBeforeStart
  };
}

function mapDispatchToProps() {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
