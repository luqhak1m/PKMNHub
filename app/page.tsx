
import React from "react";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import PokemonList from "./components/Pokemon";
import AbilitiesList from "./components/Ability";
import ChatbotWindow from "./components/Chatbot";
import "./styles/navbar.css";
import "./styles/home.css";

export default function HomePage() {
  return (
    <>

      <div>
        <nav className="nav-container-div">
          <ol id="ordered-list">
            <h1>PKMNHub</h1>
            <li><a href="#">Home</a></li>
            <li>
              <a href="#">Pokemon Data</a>
              <ul className="nav-dropdown">
                <li>Pokemon</li>
                <li>Ability</li>
                <li>Nature</li>
              </ul>
            </li>
          </ol>
        </nav>

        <div className="features-container-div">
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">
              Pokedex Tracker
            <span id="pokedex-tracker-description-span">Track your pokedex completion pregress across different games.</span>
              </div>
          </div>
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">Breeding Calculator
            <span id="pokedex-tracker-description-span">Track your pokedex completion pregress across different games.</span>
            </div>
          </div>
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">Pokewalker Counter
              <span id="pokedex-tracker-description-span">Track your pokedex completion pregress across different games.</span>
            </div>
          </div>
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">Team Builder            
              <span id="pokedex-tracker-description-span">Track your pokedex completion pregress across different games.</span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
