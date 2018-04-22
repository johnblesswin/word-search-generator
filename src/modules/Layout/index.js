import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import './Layout.css';

class Layout extends React.Component {

  render() {
    return (
        <React.Fragment>
            <div className="layout">
                <h1 className="app-name">{this.props.title}</h1>
                <div className="layout__menu">
                    {this.props.menu}
                </div>
                <CSSTransitionGroup
                    transitionName="page"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={1}
                >
                    <div
                        className="layout__page-content"
                        key={this.props.pagePath}
                    >
                        {this.props.pageContent}
                    </div>
                </CSSTransitionGroup>
            </div>
        </React.Fragment>
    );
  }
}

Layout.propTypes = {
    menu: PropTypes.element.isRequired,
    pageContent: PropTypes.element.isRequired,
    pagePath: PropTypes.string.isRequired
};

export default Layout;
