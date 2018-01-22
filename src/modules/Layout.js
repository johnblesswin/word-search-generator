import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Layout extends React.Component {

  render() {
    return (
        <MuiThemeProvider>
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                {this.props.menu}
                {this.props.pageContent}
                {this.props.navButtons}
            </div>
        </MuiThemeProvider>
    );
  }
}

export default Layout;
