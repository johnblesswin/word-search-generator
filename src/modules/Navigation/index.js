import React from 'react';
import { withRouter } from 'react-router-dom';
import { Steps, Button, Icon } from 'antd';
import './Navigation.css';

class Navigation extends React.Component {

    getStep = () => {
        switch (this.props.location.pathname) {
            case '/setup-grid': return 0;
            case '/add-words': return 1;
            case '/preview': return 2;
            case '/print': return 3;
            default: return -1;
        }
    }

    navigateTo = (location) => {
        this.props.history.push(location);
    }

    getStepper = () => {
        const activeStep = this.getStep();

        return (
            <Steps current={activeStep} className="navigation-stepper">
                <Steps.Step title="Setup grid" onClick={() => this.navigateTo('/setup-grid')} />
                <Steps.Step title="Add words" onClick={() => this.navigateTo('/add-words')} />
                <Steps.Step title="Preview" onClick={() => this.navigateTo('/preview')} />
                <Steps.Step title="Print" onClick={() => this.navigateTo('/print')} />
            </Steps>
        );
    }

    getNavButtons = () => {
        return (
            <div>
        <Button.Group size="large">
          <Button type="normal" disabled>
            <Icon type="left" />Back
          </Button>
          <Button type="primary">
            Next<Icon type="right" />
          </Button>
        </Button.Group>
            </div>
        );
    }

    render() {
        return this.props.navButtons
            ? this.getNavButtons()
            : this.getStepper();
    }

}

export default withRouter(Navigation);