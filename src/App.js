import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'ddccc3bae88d4e74b4253d929aa76e69'
});

const particlesParam = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      textfield:"",
      imageurl:"",
      box:{},
      route: 'signin',
      signedin: false
    };
  }

  onTextChange = (event) => {
    this.setState({textfield: event.target.value})
}

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageDim = document.getElementById("face");
    const height = Number(imageDim.height);
    const width = Number(imageDim.width);
    return {
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageurl: this.state.textfield})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.textfield)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onStatusChange = (route) => {
    if (route === "signout") {
      this.setState({signedin: false})
    } else if (route === "home") {
      this.setState({signedin: true})
    }
    this.setState({route: route}) 
  }

  render() {
    const {signedin,box,imageurl,route} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesParam}
            />
        <Navigation isSignedIn={signedin} statuschange={this.onStatusChange}/>
        {
          route === "home" 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm textchange={this.onTextChange} buttondetect={this.onSubmit}/>
              <FaceRecognition box={box} imagelink={imageurl}/>
            </div>
          : (
              route === "signin"
              ? <Signin statuschange={this.onStatusChange}/>
              : <Register statuschange={this.onStatusChange}/>
            )
        }
        
      </div>
    );
  }
}

export default App;
