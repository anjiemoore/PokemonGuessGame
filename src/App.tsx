import React from 'react';
import './App.css';
import loading from './loading.gif';


const TOTAL_NUM_POKEMON = 893;

class Game extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {imageURL: null, silhouette: true};
  }

  async newPokemon() {
    let imageURL = null;
    
    this.setState({imageURL: loading, silhouette: false});
    while (!imageURL) {
      const randomNumber = Math.floor(Math.random() * TOTAL_NUM_POKEMON);
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
      console.log(endpoint);
      const data = await (await fetch(endpoint)).json();
      imageURL = data.sprites.other["official-artwork"].front_default;
    }
    console.log(imageURL);
    this.setState({imageURL, silhouette: true});
  }

  render() {
    const style: React.CSSProperties = {
      filter: "contrast(0) brightness(0)"
    }
    return (
      <div className="App">
        <img className="image" style={this.state.silhouette ? style : undefined} alt="" src={this.state.imageURL}></img>
        <button className="start" onClick={() => this.newPokemon()}>Start Game</button>
        <button className="start" onClick={() => this.setState({silhouette: false})}>Reveal</button>

      </div>
    );  
  }
}

function App() {
  return (<Game />);
}

export default App;
