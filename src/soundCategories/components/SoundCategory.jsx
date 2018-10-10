import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import SoundCategoryMenu from '../containers/SoundCategoryMenu';
import SoundCategoryControls from '../containers/SoundCategoryControls';
import SoundCategoryItem from '../containers/SoundCategoryItem';

const styles = theme => ({
  removePadding: {
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
  soundList: {
    marginLeft: theme.spacing.unit * (-1/2),
    marginRight: theme.spacing.unit * (-1/2),
  },
  canDrop: {
    background: 'rgba(0,0,0,0.25)',
  },
  cardPadding: {
    padding: 0.5 * theme.spacing.unit,
  },
  headlinePadding: {
    padding: theme.spacing.unit,
    paddingBottom: 0,
  },
  headlineControls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '-0.5rem',
  },
});

const SoundCategory = ({
  boardUuid,
  canDrop,
  classes,
  connectDropTarget,
  isOver,
  name,
  onSoundPickerOpen,
  sounds,
  uuid,
}) => {
  const categoryName = name || 'Default';
  return connectDropTarget(
    <div>
      <Card
        className={classnames({
          [classes.canDrop]: isOver && canDrop,
        })}
      >
        <CardContent className={classes.cardPadding}>
          <div className={classnames(classes.headlinePadding, classes.headlineControls)}>
            <Typography variant="headline">
              {categoryName}
            </Typography>
            <SoundCategoryMenu
              boardUuid={boardUuid}
              uuid={uuid}
              onSoundPickerOpen={onSoundPickerOpen}
            />
          </div>
          <List className={classes.soundList} dense>
            {sounds.map(soundUuid => (
              <ListItem className={classes.removePadding} key={soundUuid}>
                <SoundCategoryItem uuid={soundUuid} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <SoundCategoryControls uuid={uuid} />
        </CardActions>
      </Card>
      <Snackbar
        open={canDrop && isOver}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={`Drop audio files here to add to category ${categoryName}`}
      />
    </div>
  );
};

SoundCategory.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  name: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  uuid: PropTypes.string.isRequired,
};

SoundCategory.defaultProps = {
  canDrop: null,
  isOver: null,
  name: null,
};

export default withStyles(styles)(SoundCategory);
