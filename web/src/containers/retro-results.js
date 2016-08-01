import { connect } from 'react-redux';
import Presentation from '../presentation/retro-results';


function mapStateToProps(state) {
  return { results: state.retro.results };
}

function mapDispatchToProps() {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
