import React from 'react';
import './App.css';
import loading from './loading.gif';


const TOTAL_NUM_POKEMON = 893;

class Game extends React.Component<{}, {imageURL: string, silhouette: boolean, display: boolean, name: string}> {
  constructor(props: any) {
    super(props);
    this.state = {imageURL: "", silhouette: true, display: true, name: ""};
  }

  async newPokemon() {
    let imageURL = null;
    let name = null;
    this.setState({imageURL: loading, silhouette: false, name: ""});
    while (!imageURL) {
      const randomNumber = Math.floor(Math.random() * TOTAL_NUM_POKEMON);
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
      console.log(endpoint);
      try {
        const data = await (await fetch(endpoint)).json();
        imageURL = data.sprites.other["official-artwork"].front_default;
        name = data.name.split("-")[0].toUpperCase();
      } catch {
        continue;
      }
    }
    console.log(imageURL);
    this.setState({imageURL, silhouette: true, display: false, name});
  }

  render() {
    const style: React.CSSProperties = {
      filter: "contrast(0) brightness(0)"
    }
    return (
      <div className="App">
        <img 
        className="image" 
        onLoad={() => this.setState({display: true})} 
        style={{filter: `${this.state.silhouette ? "contrast(0) brightness(0)" : ""}`, display: `${this.state.display ? "inline-block" : "none"}`}} 
        alt="" src={this.state.imageURL}></img>
        <br></br>
        <h1 style={{display: `${!this.state.silhouette ? "inline-block" : "none"}`}}>{this.state.name}</h1>
        <br></br>
        <br></br>
        <button className="start" onClick={() => this.newPokemon()}>Start Game</button>
        <button className="start" onClick={() => this.setState({silhouette: !this.state.silhouette})}>{this.state.silhouette ? "Reveal" : "Hide"}</button>

      </div>
    );  
  }
}

function App() {
  return (<Game />);
}

export default App;
