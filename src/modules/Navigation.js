import React from 'react';
import { withRouter } from 'react-router-dom';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
            <React.Fragment>
                <Stepper linear={false} activeStep={activeStep}>
                    <Step>
                        <StepButton onClick={() => this.navigateTo('/setup-grid')}>
                            Grid setup
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.navigateTo('/add-words')}>
                            Add words
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.navigateTo('/preview')}>
                            Preview
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.navigateTo('/print')}>
                            Print!
                        </StepButton>
                    </Step>
                </Stepper>
            </React.Fragment>
        );
    }

    getNavButtons = () => {
        return (
            <div>nav buttons</div>
        );
    }

    render() {
        return this.props.navButtons
            ? this.getNavButtons()
            : this.getStepper();
    }

}

export default withRouter(Navigation);