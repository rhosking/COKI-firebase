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

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};


function SimpleTable(props) {
  const { classes } = props;

  return (
    <div className={classes.tableContainer}>
      <Typography variant="h4" gutterBottom component="h2">
        {props.data && props.data.data && props.data.data.institutionName}
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell numeric>MSA</TableCell>
              <TableCell numeric>Scopus</TableCell>
              <TableCell numeric>WOS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.data && props.data.data.months && Object.keys(props.data.data.months).map(n => {
              return (
                <TableRow key={n}>
                  <TableCell component="th" scope="row">
                    {n}
                  </TableCell>
                  <TableCell numeric>{props.data.data.months[n].sources.msa ? props.data.data.months[n].sources.msa.results : null}</TableCell>
                  <TableCell numeric>{props.data.data.months[n].sources.scopus ? props.data.data.months[n].sources.scopus.results : null}</TableCell>
                  <TableCell numeric>{props.data.data.months[n].sources.wos ? props.data.data.months[n].sources.wos.results : null}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
