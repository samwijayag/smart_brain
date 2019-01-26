import React, { Component } from 'react';
import Clarifai from 'clarifai'
import Particles from 'react-particles-js'
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'


const app = new Clarifai.App({
 apiKey: '17149f79be024324bdbfe8c89b178f3e'
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
			imageUrl: '', 
			box:{},
			route: 'signin',
			isSignedIn: false,
			user: {
				id:'',
				email:'',
				name: '', 
				entries:0 ,
				joined: ''

			}
		}
	}

	loadUser = (data) => {
		 this.setState({
		 	user:{
		 		id:data.id,
				email:data.email,
				name:data.name, 
				entries:data.entries,
				joined:data.joined
			}
		 })
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

	onRouteChange = (route) => {
		if(route=== 'signout'){
			this.setState({isSignedIn: false})
		}else if(route ==='home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route})
	}

	render() {
	    return (
	      <div className='App'>
		      <div>
		      	<Particles className='particles'
		              params={particlesOptions}
		              />
		        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
		        { this.state.route === 'home'
		        	 ? <div>
				        <Logo />
				        <Rank />
				        <ImageLinkForm 
					        onInputChange ={this.onInputChange}
					       	onButtonSubmit={this.onButtonSubmit}
				       	 />
				       	<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			       	</div>
			        : (
			        	this.state.route === 'signin' 
			        	? <Signin onRouteChange={this.onRouteChange}/>
			        	: <Register 
			        	loadUser = {this.loadUser}
			        	onRouteChange={this.onRouteChange}/>

			        ) 
			       
		       }
		      </div>
	      </div>
	    )
	  }
}

export default App;
