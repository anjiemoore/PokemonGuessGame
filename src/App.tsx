import React from 'react';
import './App.css';


const TOTAL_NUM_POKEMON = 893;
const newPokemon = async () => {
  let imageURL = null;

  while (!imageURL) {
    const randomNumber = Math.floor(Math.random() * TOTAL_NUM_POKEMON);
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    console.log(endpoint);
    const data = await (await fetch(endpoint)).json();
    imageURL = data.sprites.other["official-artwork"].front_default;
  }
  console.log(imageURL);
};

class Game extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {imageURL: null};
  }
  render() {
    return (
      <div className="App">
        <img src={this.state.imageURL}></img>
        <button className="start" onClick={newPokemon}>Start Game</button>
      </div>
    );  
  }
}

function App() {
  return (<Game />);
}

export default App;
