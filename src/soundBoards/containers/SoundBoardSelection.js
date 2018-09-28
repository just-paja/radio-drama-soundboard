import { connect } from 'react-redux';

import SoundBoardSelection from '../components/SoundBoardSelection';

import { getBoards } from '../selectors';

const mapStateToProps = state => ({
  boards: getBoards(state),
});

const container = connect(mapStateToProps)(SoundBoardSelection);

container.displayName = 'Connect(SoundBoardSelection)';

export default container;