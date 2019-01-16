import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js'


const particlesOptions = {	
		particles: {
			number: {
				value:160,
				density: {
					enable:true,
					value_area:800
				}
			}
		}
}
class App extends Component {
  render() {
    return (
      <div className='App'>
	      <div>
	      	<Particles className='particles'
	              params={particlesOptions}
	              />
	        <Navigation />
	        <Logo />
	        <Rank />
	        <ImageLinkForm />
	      </div>
      </div>
    )
  }
}

export default App;
