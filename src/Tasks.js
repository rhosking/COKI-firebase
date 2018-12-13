import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 0,
  },
};

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.tableContainer}>
        <Typography variant="h4" gutterBottom component="h2">
          Tasks
        </Typography>
          <Grid container spacing={24}>
  
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.title}>
                  Dispatched Tasks
              </Typography>
              <Paper className={classes.paper}>
                <List>
                    {this.props.dispatchedTasks && Object.keys(this.props.dispatchedTasks).map((n, index) => {
                      return (
                        <ListItem>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <ListItemText primary={this.props.dispatchedTasks[n] ? this.props.dispatchedTasks[n].data.gridId + " for " + this.props.dispatchedTasks[n].data.source : null} secondary={this.props.dispatchedTasks[n] ? this.props.dispatchedTasks[n].data.month : null} />
                        </ListItem>
                      );
                    })}
                </List>
              </Paper>
            </Grid>
  
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.title}>
                  Fetched Tasks
              </Typography>
              <Paper className={classes.paper}>
                <List>
                    {this.props.fetchedTasks && Object.keys(this.props.fetchedTasks).map((n, index) => {
                      return (
                        <ListItem>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <ListItemText primary={this.props.fetchedTasks[n] ? this.props.fetchedTasks[n].data.gridId  + " for " + this.props.fetchedTasks[n].data.source : null} secondary={this.props.fetchedTasks[n] ? this.props.fetchedTasks[n].data.month : null} />
                        </ListItem>
                      );
                    })}
                </List>
              </Paper>
            </Grid>
  
            <Grid item xs={3}>
              <Typography variant="h6" className={classes.title}>
                  Parsed Tasks
              </Typography>
              <Paper className={classes.paper}>
                <List>
                    {this.props.parsedTasks && Object.keys(this.props.parsedTasks).map((n, index) => {
                      return (
                        <ListItem>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <ListItemText primary={this.props.parsedTasks[n] ? this.props.parsedTasks[n].data.gridId  + " for " + this.props.parsedTasks[n].data.source : null} secondary={this.props.parsedTasks[n] ? this.props.parsedTasks[n].data.month : null} />
                        </ListItem>
                      );
                    })}
                </List>
              </Paper>
            </Grid>          
          </Grid>
      </div>
    );
  }
  
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
