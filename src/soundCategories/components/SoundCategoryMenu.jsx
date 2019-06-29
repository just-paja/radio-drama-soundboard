import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { ContextMenuUncontrolled, ContextMenuItem } from '../../components'

class SoundCategoryMenu extends React.Component {
  constructor () {
    super()
    this.handleAddSound = this.handleAddSound.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
  }

  handleAddSound () {
    this.props.onSoundPickerOpen({
      board: this.props.boardUuid,
      category: this.props.uuid
    })
  }

  handleRemove () {
    this.props.onRemove(this.props.uuid)
  }

  handleRename () {
    this.props.onRename(this.props.uuid)
  }

  render () {
    return (
      <ContextMenuUncontrolled>
        <ContextMenuItem icon={Add} label='Add sounds' onClick={this.handleAddSound} />
        <ContextMenuItem icon={TextFields} label='Rename' onClick={this.handleRename} />
        <ContextMenuItem icon={Delete} label='Remove' onClick={this.handleRemove} />
      </ContextMenuUncontrolled>
    )
  }
}

SoundCategoryMenu.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onSoundPickerOpen: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired
}

export default SoundCategoryMenu
