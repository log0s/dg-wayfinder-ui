import React from 'react';
import { withStyles } from 'material-ui';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import DataInput from './components/DataInput';
import DataOutput from './components/DataOutput';

// import shipParrot from './img/shipitparrot.gif';
import pirateParrot from './img/pirateparrot.gif';

const styles = {
  titleBar: {
    justifyContent: 'center'
  },
  title: {
    fontSize: '24px',
    margin: '10px'
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
    height: '90vh'
  },
  dataSection: {
    width: '40vw',
    height: '80vh'
  }
};

const titleParrot = () => (<img src={pirateParrot} style={{margin:'10px'}} alt='' height='60px' />);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      geojson: '',
      csv: '',

      outputFormat: 'geojson'
    }
  }

  setStateFromChild( newState ) {
    this.setState( newState );
  }

  render() {
    const { classes } = this.props;
    const { geojson, csv, outputFormat } = this.state;

    return (
      <div className="App">
        <AppBar position='static' color='default'>
          <Toolbar className={classes.titleBar}>
            {titleParrot()}
            {titleParrot()}
            {titleParrot()}
            {titleParrot()}
            <span className={classes.title}>Parrot Ship</span>
            {titleParrot()}
            {titleParrot()}
            {titleParrot()}
            {titleParrot()}
          </Toolbar>
        </AppBar>
        <div className={classes.contents}>
          <Paper className={classes.dataSection}>
            <DataInput setParentState={this.setStateFromChild.bind(this)} outputFormat={outputFormat} />
          </Paper>
          <Paper className={classes.dataSection}>
            <DataOutput setParentState={this.setStateFromChild.bind(this)} geojson={geojson} csv={csv} />
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles( styles )( App );