import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom'


class InstitutionListItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleInstitutionSelection = this.handleInstitutionSelection.bind(this);
  }

  //const { classes } = props;

  handleInstitutionSelection(e) {
    this.props.onInstitutionSelection(e);
  };

  render() {
    return (
      <div>
        <ListSubheader inset>Institutions</ListSubheader>
        {this.props.institutionList && this.props.institutionList.map((n, index) => {
          return (
            <Link to="/" key={index}>
              <ListItem button
                onClick={(e) => this.handleInstitutionSelection(index, e)}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={n.data.institutionName} />
              </ListItem>
            </Link>
              );
          })}
      </div>
    );
  }
}

InstitutionListItems.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default (InstitutionListItems);
