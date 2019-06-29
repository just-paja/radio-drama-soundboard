import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'
import MusicNote from '@material-ui/icons/MusicNote'
import PropTypes from 'prop-types'
import React from 'react'
import SceneSpeedDial from '../../components/SceneSpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import { BoardRenameDialog } from './BoardRenameDialog'
import { boardRoutines } from '../actions'
import { connect } from 'react-redux'

const BoardSpeedDialComponent = ({
  onBoardCreate,
  onCategoryCreate,
  onSoundAdd
}) => (
  <SceneSpeedDial label='Sound Grid Speed Dial'>
    <SpeedDialAction
      icon={<MusicNote />}
      onClick={onSoundAdd}
      tooltipTitle='Add Sound'
    />
    <SpeedDialAction
      icon={<ListIcon />}
      onClick={onCategoryCreate}
      tooltipTitle='Create Category'
    />
    <SpeedDialAction
      icon={<DashboardIcon />}
      onClick={onBoardCreate}
      tooltipTitle='Create Board'
    />
  </SceneSpeedDial>
)

BoardSpeedDialComponent.displayName = 'BoardSpeedDial'
BoardSpeedDialComponent.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onCategoryCreate: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onCategoryCreate: boardRoutines.createCategory,
  onBoardCreate: boardRoutines.create,
  onBoardRename: BoardRenameDialog.open
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onCategoryCreate: () => dispatchProps.onCategoryCreate(ownProps.boardUuid)
  }
}

export const BoardSpeedDial = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(BoardSpeedDialComponent)
