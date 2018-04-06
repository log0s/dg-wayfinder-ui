import React from 'react';
import { withStyles } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = {
  wrapper: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textDisplay: {
    width: '90%',
    height: '85%',
    boxSizing: 'border-box',
    marginTop: '5%',
    border: '1px solid lightgray'
  }
};

class DataOutput extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTab: 'geojson'
    };
  }

  handleTabChange( event, value ) {
    this.setState({ selectedTab: value });
    this.props.setParentState({ outputFormat: value });
  }

  renderTab() {
    const { classes, geojson, csv } = this.props;

    switch ( this.state.selectedTab ) {
      case 'geojson':
        return(
          <textarea 
            className={classes.textDisplay}
            value={geojson}
            readOnly
          />
        );
      case 'csv':
        return(
          <textarea 
            className={classes.textDisplay}
            value={csv}
            readOnly
          />
        );
      default:
        return( <div>Que?</div> );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.selectedTab}
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
      </div>
    );
  }
}

export default withStyles( styles )( DataOutput );