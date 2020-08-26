import React from 'react';
import './App.css';
import loading from './loading.gif';


const TOTAL_NUM_POKEMON = 893;

class Game extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {imageURL: null};
  }

  async newPokemon() {
    let imageURL = null;
    
    this.setState({imageURL: loading});
    while (!imageURL) {
      const randomNumber = Math.floor(Math.random() * TOTAL_NUM_POKEMON);
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
      console.log(endpoint);
      const data = await (await fetch(endpoint)).json();
      imageURL = data.sprites.other["official-artwork"].front_default;
    }
    console.log(imageURL);
    this.setState({imageURL});
  }

  render() {
    return (
      <div className="App">
        <img alt="" src={this.state.imageURL}></img>
        <button className="start" onClick={() => this.newPokemon()}>Start Game</button>
      </div>
    );  
  }
}

function App() {
  return (<Game />);
}

export default App;
