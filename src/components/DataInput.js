import React from 'react';
import { withStyles } from 'material-ui';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import { CircularProgress } from 'material-ui/Progress';

import fetchParse from '../lib/fetch-parse';

import sadParrot from '../img/sadparrot.gif';
import shipParrot from '../img/shipitparrot.gif';

const styles = {
  wrapper: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    width: '90%',
    height: '85%',
    boxSizing: 'border-box',
    marginTop: '5%',
    border: '1px solid lightgray'
  },
  queryButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  }
};

class DataInput extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTab: 'geojson',
      querying: false,

      csv: '',
      geojson: ''
    };
  }

  handleTabChange( event, value ) {
    this.setState({ selectedTab: value });
  }

  handleInputChange( type, event ) {
    this.setState({ [type]: event.target.value });
  }

  sendQuery() {
    const { selectedTab } = this.state;
    const { outputFormat } = this.props;

    const options = {
      'method': 'POST',
      'headers': {
        // 'Authorization': `Bearer ${accessToken}`,
        'Content-Type': selectedTab === 'geojson' ? 'application/json' : 'text/csv'
      },
      'body': this.state[selectedTab]
    };

    this.setState({ querying: true });

    fetchParse( `http://${process.env.REACT_APP_WAYFINDER_API_URL}/summary?input=${selectedTab}&output=${outputFormat}`, options )
      .then( result => {
        const newParentState = outputFormat === 'geojson'
          ? { 'geojson': JSON.stringify( result ) }
          : { 'csv': result };

        this.props.setParentState( newParentState );
      })
      .catch( error => {
        console.error( error );
      })
      .then( () => this.setState({ querying: false }) );
  }

  renderTab() {
    const { classes } = this.props;
    const { selectedTab, geojson, csv } = this.state;

    switch ( selectedTab ) {
      case 'geojson':
        return(
          <textarea 
            className={classes.textInput}
            value={geojson}
            onChange={this.handleInputChange.bind(this, 'geojson')}
          />
        );
      case 'csv':
        return(
          <textarea 
            className={classes.textInput}
            value={csv}
            onChange={this.handleInputChange.bind(this, 'csv')}
          />
        );
      default:
        return( <div>Que?</div> );
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedTab, geojson, csv, querying } = this.state;

    const hasData = (selectedTab === 'geojson' && geojson) || (selectedTab === 'csv' && csv);

    return (
      <div className={classes.wrapper}>
        <AppBar position='static' color='default'>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange.bind(this)}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab label='GeoJSON' value='geojson' />
            <Tab label='CSV' value='csv' />
          </Tabs>
        </AppBar>

        {this.renderTab()}
        
        <Button
          variant='fab'
          className={classes.queryButton}
          color={hasData ? 'secondary' : 'default'}
          disabled={querying || !hasData}
          onClick={this.sendQuery.bind(this)}
        >
          {querying ? <CircularProgress /> : <img src={hasData ? shipParrot : sadParrot} alt='' height='30px' />}
        </Button>
      </div>
    );
  }
}

export default withStyles( styles )( DataInput );