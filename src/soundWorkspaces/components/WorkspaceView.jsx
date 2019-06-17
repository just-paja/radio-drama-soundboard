import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getActiveBoardUuid, getWorkspaceView } from '../selectors'
import { isGalleryEmpty } from '../../soundGallery/selectors'
import { SoundBoardView } from './SoundBoardView'
import { SoundGalleryView } from './SoundGalleryView'
import { SoundLibraryStatus } from './SoundLibraryStatus'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceEmpty } from './WorkspaceEmpty'
import { WorkspaceSidebar } from './WorkspaceSidebar'

const styles = theme => ({
  sidebar: {
    minWidth: theme.spacing(24)
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  },
  withHeader: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

function renderContent (empty, board, view) {
  if (!empty) {
    if (view === VIEW_LIBRARY) {
      return <SoundGalleryView />
    }
    if (view === VIEW_BOARD && board) {
      return <SoundBoardView board={board} />
    }
  }
  return <WorkspaceEmpty />
}

function WorkspaceViewComponent ({ classes, board, empty, view }) {
  return (
    <div className={classes.withHeader}>
      <SoundLibraryStatus />
      <div className={classes.view}>
        <WorkspaceSidebar />
        {renderContent(empty, board, view)}
      </div>
    </div>
  )
}

WorkspaceViewComponent.displayName = 'WorkspaceView'

WorkspaceViewComponent.propTypes = {
  board: PropTypes.string,
  empty: PropTypes.bool,
  view: PropTypes.string
}

WorkspaceViewComponent.defaultProps = {
  board: null,
  empty: false,
  view: null
}

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  empty: isGalleryEmpty(state),
  view: getWorkspaceView(state)
})

export const WorkspaceView = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceViewComponent))
