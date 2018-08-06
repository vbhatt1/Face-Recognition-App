import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
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
      imageurl:""
    };
  }

  onTextChange = (event) => {
    this.setState({textfield: event.target.value})
}

  onSubmit = () => {
    this.setState({imageurl: this.state.textfield})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.textfield).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesParam}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm textchange={this.onTextChange} buttondetect={this.onSubmit}/>
        <FaceRecognition imagelink={this.state.imageurl}/>
      </div>
    );
  }
}

export default App;
