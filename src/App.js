import React from 'react'
import './App.css'
import Counter from './components/Counter'
import Spinner from './components/Spinner'
import Blinker from './components/Blinker'
import Slider from './components/Slider'
import Fibonacci from './components/Fibonacci'

function App() {
	return (
		<div style={{
			display: 'inline-flex',
			flexFlow: 'column nowrap',
			justifyContent: 'center',
			boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.7)',
			borderRadius: '5px',
			padding: '4px',
			backgroundColor: 'white',
			marginLeft: '30%',
			marginTop: '5%'
		}}>
			<Fibonacci />
			<div style={{
				display: 'flex',
				flexFlow: 'row nowrap'
			}}>
				<Counter />
				<Blinker />
				<Spinner />
			</div>
			<div style={{
				display: 'flex',
				flexFlow: 'row nowrap'
			}}>
				<Slider />
			</div>
		</div>
	)
}

export default App
