import React, { Component } from 'react';
import FormStep from './FormStep';
import './SimonForm.css'

const FirstStep = ({ onNext, onBack }) => (
  <FormStep title="Let's start planning your retirement" name="01. Retirement age" onNext={onNext} onBack={onBack} />
)
const SecondStep = ({ onNext, onBack }) => (
  <FormStep title="What are your monthly expenses?" name="02. Monthly expenses" onNext={onNext} onBack={onBack} />
)
const ThirdStep = ({ onNext, onBack }) => (
  <FormStep title="What is your retirement budget?" name="03. Retirement budget" onNext={onNext} onBack={onBack} />
)

export default class SimonForm extends Component {
  static STEPS = [FirstStep, SecondStep, ThirdStep]
  static STEP_NAMES = [
    'Retirement age',
    'Monthly expenses',
    'Retirement budget'
  ]

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0
    };
  }

  onNext = () => {
    this.setState(({ currentStep }) => ({ currentStep: currentStep + 1 }))
  }

  onBack = () => {
    this.setState(({ currentStep }) => ({ currentStep: currentStep - 1 }))
  }

  getStepPosition(step) {
    if (step <= this.state.currentStep) {
      return step * 48;
    } else {
      return step * 48 + (300 - 48);
    }
  }

  getStepStyle(step) {
    return {
      top: `${this.getStepPosition(step)}px`,
    }
  }

  stepClass(step) {
    const classNames = ['simon-form__step'];
    if (step === this.state.currentStep) classNames.push('simon-form__step--current');
    if (step < this.state.currentStep) classNames.push('simon-form__step--previous');
    if (step > this.state.currentStep) classNames.push('simon-form__step--next');
    return classNames.join(' ');
  }

  render() {
    return (
      <ul className='simon-form'>
        {SimonForm.STEPS.map((StepComponent, step) => (
          <li key={step} className={this.stepClass(step)} style={this.getStepStyle(step)}>
            <span className="step-dot">
              <svg height="32" width="32">
                <circle cx="16" cy="16" r="16" stroke="black" stroke-width="0" fill="red" />
              </svg>
            </span>
            <div className="step-body">
              <h2 className="step-name">0{step}. {SimonForm.STEP_NAMES[step]}</h2>
              <div className="step-content">
                <StepComponent onNext={step === SimonForm.STEPS.length - 1 ? null : this.onNext} onBack={step === 0 ? null : this.onBack} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}