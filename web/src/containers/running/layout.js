import { connect } from 'react-redux';
import Presentation from '../../presentation/running/layout';


function mapStateToProps(state) {
  return {
    durationRemaining: state.activity.time.durationRemaining,
    pctElapsed: Math.round(state.activity.time.pctElapsed * 10000) / 100
  };
}

function mapDispatchToProps() {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
