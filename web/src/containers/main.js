import { connect } from 'react-redux';
import Presentation from '../presentation/main';

function mapStateToProps(state) {
  return {
    activity: state.activity
  };
}

function mapDispatchToProps() {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
