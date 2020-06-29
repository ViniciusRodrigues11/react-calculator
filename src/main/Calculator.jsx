import React, { Component } from 'react'
import './Calculator.css'

import Button from '../Components/Button'
import Display from '../Components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {

  state = { ...initialState }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if (this.state.current === '0') {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]

      try {
        // eslint-disable-next-line
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }

  }

  addDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
    }

  }

  render() {

    const addDigit = n => this.addDigit(n)
    const setOperation = op => this.setOperation(op)

    const buttons = [
      { name: "AC", type: "triple" },
      { name: '/', type: "operator" },
      { name: '7', type: "number" },
      { name: '8', type: "number" },
      { name: '9', type: "number" },
      { name: '*', type: "operator" },
      { name: '4', type: "number" },
      { name: '5', type: "number" },
      { name: '6', type: "number" },
      { name: '-', type: "operator" },
      { name: '1', type: "number" },
      { name: '2', type: "number" },
      { name: '3', type: "number" },
      { name: '+', type: "operator" },
      { name: '0', type: ["number", "double"] },
      { name: '.', type: "number" },
      { name: '=', type: 'operator' }]

    //eslint-disable-next-line
    const Btn = buttons.map(button => {
      if (button.name === 'AC') {
        return (
          <Button key={button.name}
            click={() => this.clearMemory()}
            buttonType={button.type}
            label={button.name} />
        )
      }
      if (button.type === 'operator') {
        return (
          <Button key={button.name}
            click={setOperation}
            buttonType={button.type}
            label={button.name} />
        )
      }
      if (button.type.includes('number')) {
        return (
          <Button key={button.name}
            click={addDigit}
            buttonType={button.type}
            label={button.name} />
        )
      }
    })

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        {Btn}
      </div>
    )
  }

}