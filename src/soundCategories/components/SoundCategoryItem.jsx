import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundStatusIcon from './SoundStatusIcon';

import { SoundName } from '../../sounds/components';
import { Sound } from '../../sounds/proptypes';

const styles = theme => ({
  button: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    margin: 0,
    padding: theme.spacing.unit,
    width: '100%',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  icon: {
    height: theme.typography.fontSize * 3/2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: theme.typography.fontSize * 3/2,
  }
});

class SoundCategoryItem extends Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onToggle, sound } = this.props;
    onToggle(sound.uuid);
  }

  render() {
    const {
      classes,
      connectDragSource,
      search,
      sound,
    } = this.props;
    return sound && connectDragSource ? connectDragSource(
      <button
        className={classes.button}
        disabled={sound.error}
        onClick={this.handleToggle}
      >
        <SoundStatusIcon
          className={classes.icon}
          error={sound.error}
          loading={sound.loading}
          playing={sound.playing}
        />
        <SoundName
          name={sound.name}
          uuid={sound.uuid}
          highlight={search}
        />
    </button>
    ) : null;
  }
}

SoundCategoryItem.propTypes = {
  connectDragSource: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired,
};

SoundCategoryItem.defaultProps = {
  connectDragSource: null,
  search: '',
};

export default withStyles(styles)(SoundCategoryItem);
