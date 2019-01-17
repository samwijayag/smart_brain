import React, { Component } from 'react';
import Clarifai from 'clarifai'
import Particles from 'react-particles-js'
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'


const app = new Clarifai.App({
 apiKey: '8e03116228814a758a92cf4492480554'
});


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
	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl : this.state.input})
		app.models.predict(
			Clarifai.COLOR_MODEL, 
			this.state.input)
		.then(
		    function(response) {
		    	console.log(response)
		      // do something with response
		    },
		    function(err) {
		      // there was an error
		    }
		  );
	}

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
		        <ImageLinkForm onInputChange ={this.onInputChange}
		       	 onButtonSubmit={this.onButtonSubmit}
		       	 />
		       	<FaceRecognition imageUrl={this.state.imageUrl}/>
		      </div>
	      </div>
	    )
	  }
}

export default App;
