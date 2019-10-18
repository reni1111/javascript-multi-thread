import React, { Component } from 'react'
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./../Fibonacci.worker'

class Fibonacci extends Component {
	state = {
		number: '',
		isCalculating: false,
		// number for who the fibonacci was calcuated
		exNumber: 0,
		fibonacci: 0
	}

	componentDidMount = () => {
		this.toggleWebWorker()
	}

	toFixed = (x) => {
		if (Math.abs(x) < 1.0) {
			let e = parseInt(x.toString().split('e-')[1])
			if (e) {
				x *= Math.pow(10, e - 1)
				x = '0.' + (new Array(e)).join('0') + x.toString().substring(2)
			}
		} else {
			let e = parseInt(x.toString().split('+')[1])
			if (e > 20) {
				e -= 20
				x /= Math.pow(10, e)
				x += (new Array(e + 1)).join('0')
			}
		}
		return x
	}

	fibonaciHandler = (n) => {
		if (window.disableWebWorker)
			return this.calcFibonacci(n)
		this.setState({
			isCalculating: true,
			exNumber: n
		})
		// using WORKER
		let fibonacciWorker = new worker()
		return fibonacciWorker.calcFibonacci(n).then(fibonacci => {
			fibonacciWorker.terminate()
			return this.setState({
				isCalculating: false,
				fibonacci: fibonacci
			})
		})
	}

	calcFibonacci = (n) => {
		this.setState({
			isCalculating: true,
			exNumber: n
		}, () => {
			let a = 0, b = 1, c, i
			if (n === 0)
				return this.setState({
					isCalculating: false,
					fibonacci: 0
				})
			for (i = 2; i <= n; i++) {
				c = a + b
				a = b
				b = c
			}
			return this.setState({
				isCalculating: false,
				fibonacci: this.toFixed(b)
			})
		})

	}

	toggleWebWorker = () => {
		let disableWebWorker = window.disableWebWorker
		window.disableWebWorker = !disableWebWorker
		this.forceUpdate()
	}

	onChangeNumber = (event) => {
		this.setState({
			number: event.target.value
		})
	}

	render() {
		let ans, bgColor

		console.log(this.state.isCalculating)
		if (this.state.isCalculating) {
			ans = 'calculating...'
			bgColor = 'rgba(255, 0, 0, 0.2)'
		} else {
			ans = 'Answer is ' + this.state.fibonacci
			bgColor = 'rgba(0, 255, 0, 0.2)'
		}

		return (
			<div style={{
				height: '200px',
				textAlign: 'center',
				display: 'inline-block',
				boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
				borderRadius: '2px',
				padding: '8px 12px',
				backgroundColor: bgColor,
				margin: '4px',
				position: 'relative'
			}}>
				<h2>Fibonacci Sequence</h2>
				<div style={{
					position: 'absolute',
					top: 8,
					right: 8,
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					color: 'white',
					padding: '4px 8px',
					borderRadius: 3,
					display: 'flex',
					cursor: 'pointer',
					alignItems: 'center'
				}}
				onClick={this.toggleWebWorker}
				>
					<div style={{ fontSize: 12 }}>Web Worker</div>
					<div style={{
						fontWeight: 'bold',
						marginLeft: 8,
						color: window.disableWebWorker ? 'red' : 'green'
					}}>{window.disableWebWorker ? 'OFF' : 'ON'}</div>
				</div>
				<h3>
					{'N = ' + this.state.exNumber}
				</h3>
				<div>{ans}</div>
				<input type='number'
					onChange={this.onChangeNumber}
					style={{
						padding: '4px 8px',
						outline: 'none',
						border: 'none',
						borderRadius: '2px',
						margin: '4px',
						fontSize: '16px'
					}}
					placeholder='Enter number...' />
				<button
					style={{
						padding: '4px 8px',
						outline: 'none',
						border: 'none',
						borderRadius: '2px',
						margin: '4px',
						cursor: 'pointer'
					}}
					onClick={() => this.fibonaciHandler(+this.state.number)}
				>
					Calc
    			</button>
			</div>
		)
	}

}

export default Fibonacci