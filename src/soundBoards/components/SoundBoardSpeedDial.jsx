import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';

const styles = theme => ({
  speedDial: {
    bottom: theme.spacing.unit * 2,
    position: 'absolute',
    right: theme.spacing.unit * 2,
  },
});

class SoundBoardSpeedDial extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      open: false,
    };
  }

  handleClick() {
    this.setState(state => ({ open: !state.open }));
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, onBoardCreate, onCategoryCreate } = this.props;
    const { open } = this.state;
    const isTouch = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement;
    return (
      <SpeedDial
        ariaLabel="Sound Grid Speed Dial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={isTouch ? undefined : this.handleOpen}
        onMouseEnter={isTouch ? undefined : this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
      >
        <SpeedDialAction
          icon={<ListIcon />}
          onClick={onCategoryCreate}
          tooltipTitle="Create category"
        />
        <SpeedDialAction
          icon={<DashboardIcon />}
          onClick={onBoardCreate}
          tooltipTitle="Create board"
        />
      </SpeedDial>
    );
  }
}

SoundBoardSpeedDial.propTypes = {
  classes: Classes.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onCategoryCreate: PropTypes.func.isRequired,
};

const comp = withStyles(styles)(SoundBoardSpeedDial);

comp.displayName = 'SoundBoardSpeedDial';

export default comp;