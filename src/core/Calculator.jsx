import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const inicialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: false,
    values:[0, 0],
    currentValueIndex: 0,
}

export default class Calculator extends Component{
    state = {...inicialState}
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }
    clearMemory(){
       this.setState({...inicialState})
    }

    setOperation(operation){
       if(this.state.currentValueIndex === 0 ){
           this.setState({ operation, currentValueIndex: 1, 
                clearDisplay: true})
       }else{
           const equals = operation === '='
           const currentOperation = this.state.operation

           const values = [...this.state.values]
           try{
            values[0] = eval(` ${values[0]}${currentOperation} ${values[1]}`)
            if (isNaN(values[0]) || !isFinite(values[0])) {
                this.clearMemory()
                     return
            }
            }catch(e){
               values[0] = this.state.values[0]
               
           }
           
           values[1] = 0;

           this.setState({
               displayValue: values[0],
               operation: equals ? null : operation,
               currentValueIndex: equals ? 0 : 1,
               clearDisplay: !equals,
               values
           })
       }
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})
        if(n !== '.'){
            const i = this.state.currentValueIndex
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render(){
        return (
            <div className='calculator'>
                <Display value={this.state.displayValue} />
                <Button label="AC" cols={3} click={this.clearMemory} />
                <Button label="/" operation click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" operation click={this.setOperation} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" operation click={this.setOperation} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" operation click={this.setOperation} />
                <Button label="0" cols={2} click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button label="=" operation click={this.setOperation} />
            </div>
        )
    }
}