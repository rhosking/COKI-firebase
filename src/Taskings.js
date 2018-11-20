import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

class Taskings extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleGridListItemClick = this.handleGridListItemClick.bind(this);

    this.state = {
      open: false,
      selectedTaskingIndex: 0,
      selectedTaskingGridIndex: 0,
      grids: null,
      months: null,
      checkedMSA: false,
      checkedWoS: false,
      checkedScopus: false,
      description: ""
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ 
      selectedTaskingIndex: index,
      selectedTaskingGridIndex: 0
     });
  };

  handleGridListItemClick = (event, index) => {
    this.setState({ selectedTaskingGridIndex: index });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCheckedChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCancel = () => {
    this.setState({ 
      open: false,
      grids: null,
      months: null,
      checkedMSA: false,
      checkedWoS: false,
      checkedScopus: false,
      description: ""
    });
  };

  handleSubmit = () => {

    // Make the request
    axios.post('https://us-central1-coki-214004.cloudfunctions.net/fetch-api ', {
      gridIds: ["grid.1032.0"],
      months: ["2018-01"],
      sources: ["msa", "scopus", "wos"],
      environment: "test"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // Then return the state properties back to their defaults
    this.setState({ 
      open: false,
      grids: null,
      months: null,
      checkedMSA: false,
      checkedWoS: false,
      checkedScopus: false,
      description: ""
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        //...base,
        //color: theme.palette.text.primary,
        //'& input': {
        //  font: 'inherit',
        //},
      }),
    };

    return (
      <div className={classes.tableContainer}>
        <Typography variant="h4" gutterBottom component="h2">
          Taskings <Button onClick={this.handleClickOpen}>Create new tasking</Button>
        </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                  <List>
                      {this.props.taskings && Object.keys(this.props.taskings).map((n, index) => {
                        return (
                          <ListItem
                            key={index}
                            button
                            selected={this.state.selectedTaskingIndex === index}
                            onClick={event => this.handleListItemClick(event, index)}>
                            <ListItemIcon>
                              <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.taskings[n] ? this.props.taskings[n].data.description : null} secondary={this.props.taskings[n] ? "Created by " + this.props.taskings[n].data.user : null}/>
                          </ListItem>

                        );
                      })}
                  </List>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5" gutterBottom component="h2">
                  {this.props.taskings[this.state.selectedTaskingIndex] ? this.props.taskings[this.state.selectedTaskingIndex].data.description : null}
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={4}>
                    <List>
                        {this.props.taskings && this.props.taskings[this.state.selectedTaskingIndex] && Object.keys(this.props.taskings[this.state.selectedTaskingIndex].data.tasks).map((n, index) => {
                          return (
                            <ListItem
                              key={index}
                              button
                              selected={this.state.selectedTaskingGridIndex === index}
                              onClick={event => this.handleGridListItemClick(event, index)}>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText primary={n}/>
                            </ListItem>

                          );
                        })}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
    
            </Grid>
          </Paper>
  
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Tasking</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a new tasking to fetch results for particular GRID Ids over a period of months for the specified sources.
              </DialogContentText>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  textFieldProps={{
                    label: 'Grid IDs',
                    InputLabelProps: {
                      shrink: true,
                    },
                  }}
                  options={suggestions}
                  components={components}
                  value={this.state.grids}
                  onChange={this.handleChange('grids')}
                  placeholder="Select multiple Grid IDs"
                  isMulti
                />
              </NoSsr>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  textFieldProps={{
                    label: 'Months',
                    InputLabelProps: {
                      shrink: true,
                    },
                  }}
                  options={suggestions}
                  components={components}
                  value={this.state.months}
                  onChange={this.handleChange('months')}
                  placeholder="Select multiple months"
                  isMulti
                />
              </NoSsr>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedScopus}
                      onChange={this.handleCheckedChange('checkedScopus')}
                      value={this.state.checkedScopus}
                      color="primary"
                    />
                  }
                  label="Scopus"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedWoS}
                      onChange={this.handleCheckedChange('checkedWoS')}
                      value={this.state.checkedWoS}
                      color="primary"
                    />
                  }
                  label="WoS"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedMSA}
                      onChange={this.handleCheckedChange('checkedMSA')}
                      value={this.state.checkedMSA}
                      color="primary"
                    />
                  }
                  label="MSA"
                />
              </FormGroup>
              <TextField
                id="standard-full-width"
                label="Description of the tasking"
                value={this.state.description}
                onChange={this.handleTextChange('description')}
                style={{ margin: 8 }}
                placeholder="For an analysis of..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
  
}

export default withStyles(styles)(Taskings);
