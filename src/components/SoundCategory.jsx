import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import SoundCategoryRemoveButton from '../containers/SoundCategoryRemoveButton';
import SoundCategoryControls from '../containers/SoundCategoryControls';
import SoundItem from '../containers/SoundItem';

const styles = theme => ({
  removePadding: {
    paddingLeft: 0,
    paddingRight: 0,
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
});

const SoundCategory = ({
  canDrop,
  classes,
  connectDropTarget,
  isOver,
  name,
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
          <Typography variant="headline" className={classes.headlinePadding}>
            {categoryName}
            <SoundCategoryRemoveButton uuid={uuid} />
          </Typography>
          <List dense>
            {sounds.map(soundUuid => (
              <ListItem className={classes.removePadding} key={soundUuid}>
                <SoundItem uuid={soundUuid} />
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
  canDrop: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  name: PropTypes.string,
  sounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  uuid: PropTypes.string.isRequired,
};

SoundCategory.defaultProps = {
  canDrop: null,
  isOver: null,
  name: null,
};

export default withStyles(styles)(SoundCategory);
