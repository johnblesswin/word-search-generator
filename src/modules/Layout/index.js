import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import './Layout.css';

class Layout extends React.Component {

  render() {
    return (
        <div className="layout">
            <div className="layout__menu">
                {this.props.menu}
            </div>
            <CSSTransitionGroup
                transitionName="page"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={1}
            >
                <div key={this.props.pagePath}> {/* a unique key is required for transitions */}
                    <div className="layout__page-content">
                        {this.props.pageContent}
                    </div>
                    <div className="layout__nav-buttons">
                        {this.props.navButtons}
                    </div>
                </div>
            </CSSTransitionGroup>
        </div>
    );
  }
}

Layout.propTypes = {
    menu: PropTypes.element.isRequired,
    navButtons: PropTypes.element.isRequired,
    pageContent: PropTypes.element.isRequired,
    pagePath: PropTypes.string.isRequired
  };

export default Layout;
