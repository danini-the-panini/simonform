import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormStep.css';

export default class FormStep extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    title: PropTypes.string
  }

  onNext = () => {
    this.props.onNext();
  }

  onBack = () => {
    this.props.onBack();
  }

  render() {
    return (
      <div className="form-step">
        <h1 className="form-step__title">{ this.props.title }</h1>
        <div className="form-step__content">
          { this.props.onBack && <button className="form-step__button-next" onClick={this.onBack}>Back</button>}
          { this.props.onNext && <button className="form-step__button-previous" onClick={this.onNext}>Next</button>}
        </div>
      </div>
    )
  }
}