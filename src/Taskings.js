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

const suggestionsGrids = [
  { label: 'Curtin University', value: "grid.1032.0" },
  { label: 'Indian Institute of Science Bangalore', value: "grid.34980.36" },
  { label: 'University of Giessen', value: "grid.8664.c" },
  { label: 'Wayne State University', value: "grid.254444.7" },
  { label: 'Massachusetts Institute of Technology', value: "grid.116068.8" },
  { label: 'Moscow State University', value: "grid.14476.30" },
  { label: 'University College London', value: "grid.83440.3b" },
  { label: 'Loughborough University', value: "grid.6571.5" },
  { label: 'Cairo University', value: "grid.7776.1" },
  { label: 'University of Cape Town', value: "grid.7836.a" },
  { label: 'Dalian University of Technology', value: "grid.30055.33" },
  { label: 'University of Tokyo', value: "grid.26999.3d" },
  { label: 'National Autonomous University of Mexico', value: "grid.9486.3" },
  { label: 'University of Sao Paulo', value: "grid.11899.38" },
  { label: 'Institut Teknologi Bandung', value: "grid.434933.a" },
  { label: 'University of Edinburgh', value: "grid.4305.2" }
]

const suggestionsMonths = [
  { label: '2013-01' },
  { label: '2013-02' },
  { label: '2013-03' },
  { label: '2013-04' },
  { label: '2013-05' },
  { label: '2013-06' },
  { label: '2013-07' },
  { label: '2013-08' },
  { label: '2013-09' },
  { label: '2013-10' },
  { label: '2013-11' },
  { label: '2013-12' },
  { label: '2014-01' },
  { label: '2014-02' },
  { label: '2014-03' },
  { label: '2014-04' },
  { label: '2014-05' },
  { label: '2014-06' },
  { label: '2014-07' },
  { label: '2014-08' },
  { label: '2014-09' },
  { label: '2014-10' },
  { label: '2014-11' },
  { label: '2014-12' },
  { label: '2015-01' },
  { label: '2015-02' },
  { label: '2015-03' },
  { label: '2015-04' },
  { label: '2015-05' },
  { label: '2015-06' },
  { label: '2015-07' },
  { label: '2015-08' },
  { label: '2015-09' },
  { label: '2015-10' },
  { label: '2015-11' },
  { label: '2015-12' },
  { label: '2016-01' },
  { label: '2016-02' },
  { label: '2016-03' },
  { label: '2016-04' },
  { label: '2016-05' },
  { label: '2016-06' },
  { label: '2016-07' },
  { label: '2016-08' },
  { label: '2016-09' },
  { label: '2016-10' },
  { label: '2016-11' },
  { label: '2016-12' },
  { label: '2017-01' },
  { label: '2017-02' },
  { label: '2017-03' },
  { label: '2017-04' },
  { label: '2017-05' },
  { label: '2017-06' },
  { label: '2017-07' },
  { label: '2017-08' },
  { label: '2017-09' },
  { label: '2017-10' },
  { label: '2017-11' },
  { label: '2017-12' },
  { label: '2018-01' },
  { label: '2018-02' },
  { label: '2018-03' },
  { label: '2018-04' },
  { label: '2018-05' },
  { label: '2018-06' },
  { label: '2018-07' },
  { label: '2018-08' },
  { label: '2018-09' },
  { label: '2018-10' },
  { label: '2018-11' },
  { label: '2018-12' },
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
      selectedGridIdentifier: null,
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

  handleGridListItemClick = (event, index, n) => {
    this.setState({ 
      selectedTaskingGridIndex: index,
      selectedGridIdentifier: n 
    });
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
    let grids = []
    let months = []
    let sources = []
    
    // Convert grids to appropriate format
    this.state.grids.map(data => {
      grids.push(data.value)
    })

    // Convert months to appropraite format
    this.state.months.map(data => {
      months.push(data.value)
    })

    // convert checkboxes to appropraite foramt
    if (this.state.checkedMSA) {
      sources.push("msa")
    }
    if (this.state.checkedScopus) {
      sources.push("scopus")
    }
    if (this.state.checkedWoS) {
      sources.push("wos")
    }

    grids_1 = [
      "grid.1001.0","grid.1002.3","grid.1003.2","grid.1005.4","grid.1008.9","grid.1010.0","grid.1012.2","grid.1013.3","grid.1017.7","grid.1032.0"
    ]

    grids_2 = [
      "grid.1004.5","grid.1007.6","grid.1009.8","grid.1011.1","grid.1014.4","grid.1018.8","grid.1019.9","grid.1020.3","grid.1021.2","grid.1022.1","grid.1023.0","grid.1024.7","grid.1025.6","grid.1026.5","grid.1027.4","grid.1029.a",
"grid.1031.3","grid.1033.1","grid.1034.6","grid.1039.b","grid.1040.5","grid.1043.6","grid.1048.d","grid.117476.2","grid.266842.c","grid.266886.4","grid.411958.0"
    ]


    grids_3 = [
"grid.10388.32","grid.10698.36","grid.10784.3a","grid.10858.34","grid.11135.37","grid.116068.8","grid.11843.3f","grid.11899.38","grid.11914.3c","grid.12295.3d","grid.12380.38","grid.13063.37","grid.14476.30",
"grid.14709.3b","grid.16463.36","grid.16750.35","grid.168010.e","grid.16821.3c","grid.170205.1","grid.17088.36","grid.177174.3","grid.189504.1","grid.19006.3e","grid.19188.39","grid.20861.3d","grid.21107.35",
"grid.213917.f","grid.21729.3f","grid.21925.3d","grid.252890.4","grid.254444.7","grid.254880.3","grid.25879.31","grid.262743.6","grid.264200.2","grid.26999.3d","grid.27755.32","grid.278276.e","grid.30055.33"
    ]
  grids_4 = [
"grid.34980.36","grid.35030.35","grid.35403.31","grid.35541.36","grid.35915.3b","grid.38142.3c","grid.410356.5","grid.410714.7","grid.411247.5","grid.411301.6","grid.411340.3","grid.411840.8","grid.412419.b",
"grid.412522.2","grid.412813.d","grid.412831.d","grid.413050.3","grid.417984.7","grid.419886.a","grid.42505.36","grid.4280.e","grid.4305.2","grid.434933.a","grid.448660.8","grid.4488.0","grid.4514.4","grid.461025.4",
"grid.4691.a","grid.4708.b","grid.47100.32","grid.47840.3f","grid.4830.f","grid.4991.5","grid.5012.6","grid.5037.1","grid.5110.5","grid.5132.5","grid.5252.0","grid.5254.6","grid.5333.6","grid.5335.0","grid.5380.e"
  ]
    grids_5 = [
"grid.5475.3","grid.5477.1","grid.5510.1","grid.5596.f","grid.5601.2","grid.5606.5","grid.5801.c","grid.5836.8","grid.5841.8","grid.5842.b","grid.59025.3b","grid.5963.9","grid.6571.5","grid.6612.3","grid.67105.35",
"grid.6852.9","grid.7177.6","grid.7247.6","grid.7345.5","grid.7372.1","grid.7400.3","grid.7427.6","grid.7445.2","grid.7700.0","grid.7737.4","grid.77602.34","grid.7776.1","grid.7836.a","grid.8096.7","grid.8217.c",
"grid.83440.3b","grid.8591.5","grid.8664.c","grid.89336.37","grid.9486.3","grid.9601.e","grid.9654.e"
    ]


    /*months = [
      "2000-01", "2000-02", "2000-03", "2000-04", "2000-05", "2000-06", "2000-07", "2000-08", "2000-09", "2000-10", "2000-11", "2000-12",
      "2001-01", "2001-02", "2001-03", "2001-04", "2001-05", "2001-06", "2001-07", "2001-08", "2001-09", "2001-10", "2001-11", "2001-12",
      "2002-01", "2002-02", "2002-03", "2002-04", "2002-05", "2002-06", "2002-07", "2002-08", "2002-09", "2002-10", "2002-11", "2002-12",
      "2003-01", "2003-02", "2003-03", "2003-04", "2003-05", "2003-06", "2003-07", "2003-08", "2003-09", "2003-10", "2003-11", "2003-12",
      "2004-01", "2004-02", "2004-03", "2004-04", "2004-05", "2004-06", "2004-07", "2004-08", "2004-09", "2004-10", "2004-11", "2004-12",
      "2005-01", "2005-02", "2005-03", "2005-04", "2005-05", "2005-06", "2005-07", "2005-08", "2005-09", "2005-10", "2005-11", "2005-12",
      "2006-01", "2006-02", "2006-03", "2006-04", "2006-05", "2006-06", "2006-07", "2006-08", "2006-09", "2006-10", "2006-11", "2006-12",
      "2007-01", "2007-02", "2007-03", "2007-04", "2007-05", "2007-06", "2007-07", "2007-08", "2007-09", "2007-10", "2007-11", "2007-12",
      "2008-01", "2008-02", "2008-03", "2008-04", "2008-05", "2008-06", "2008-07", "2008-08", "2008-09", "2008-10", "2008-11", "2008-12",
      "2009-01", "2009-02", "2009-03", "2009-04", "2009-05", "2009-06", "2009-07", "2009-08", "2009-09", "2009-10", "2009-11", "2009-12",
      "2010-01", "2010-02", "2010-03", "2010-04", "2010-05", "2010-06", "2010-07", "2010-08", "2010-09", "2010-10", "2010-11", "2010-12",
      "2011-01", "2011-02", "2011-03", "2011-04", "2011-05", "2011-06", "2011-07", "2011-08", "2011-09", "2011-10", "2011-11", "2011-12",
      "2012-01", "2012-02", "2012-03", "2012-04", "2012-05", "2012-06", "2012-07", "2012-08", "2012-09", "2012-10", "2012-11", "2012-12",
      "2013-01", "2013-02", "2013-03", "2013-04", "2013-05", "2013-06", "2013-07", "2013-08", "2013-09", "2013-10", "2013-11", "2013-12",
      "2014-01", "2014-02", "2014-03", "2014-04", "2014-05", "2014-06", "2014-07", "2014-08", "2014-09", "2014-10", "2014-11", "2014-12",
      "2015-01", "2015-02", "2015-03", "2015-04", "2015-05", "2015-06", "2015-07", "2015-08", "2015-09", "2015-10", "2015-11", "2015-12",
      "2016-01", "2016-02", "2016-03", "2016-04", "2016-05", "2016-06", "2016-07", "2016-08", "2016-09", "2016-10", "2016-11", "2016-12",
      "2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06", "2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12",
      "2018-01", "2018-02", "2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08", "2018-09", "2018-10", "2018-11", "2018-12",
    ]*/

    // Make the request
    axios.post('https://us-central1-coki-214004.cloudfunctions.net/fetch-api ', {
      gridIds: grids,
      months: months,
      sources: sources,
      environment: "prod",
      description: this.state.description,
      user: ""
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
                              onClick={event => this.handleGridListItemClick(event, index, n)}>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText primary={n}/>
                            </ListItem>

                          );
                        })}
                    </List>
                  </Grid>
                  <Grid item xs={8}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell>Source</TableCell>
                          <TableCell>Existing</TableCell>
                          <TableCell>Completed</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.props.taskings && this.props.taskings[this.state.selectedTaskingIndex] && this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier] && Object.keys(this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier]).map(n => {
                          return (
                            <TableRow key={n}>
                              <TableCell component="th" scope="row">
                                {this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n] ? this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n].month : null}
                              </TableCell>
                              <TableCell numeric>{this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n] ? this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n].source : null}</TableCell>
                              <TableCell numeric>{this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n] ? this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n].existing.toString() : null}</TableCell>
                              <TableCell numeric>{this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n] ? this.props.taskings[this.state.selectedTaskingIndex].data.tasks[this.state.selectedGridIdentifier][n].completed.toString() : null}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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
                  options={suggestionsGrids}
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
                  options={suggestionsMonths}
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
