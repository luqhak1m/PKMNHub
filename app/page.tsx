
import React from "react";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import AbilitiesList from "./components/Ability";
import ChatbotWindow from "./components/Chatbot";

import "./styles/home.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <>

      <div>
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
            <span id="pokedex-tracker-description-span">See which Pokemon and Item would be the most useful for breeding your perfect Pokemon.</span>
            </div>
          </div>
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">Pokewalker Counter
              <span id="pokedex-tracker-description-span">Set a goal and have an approximate to when you will achieve the desired Pokewatts.</span>
            </div>
          </div>
          <div className="feature-card-div" id="pokedex-tracker-card">
            <div className="feature-card-upper"></div>
            <div className="feature-card-lower">Team Builder            
              <span id="pokedex-tracker-description-span">Build your perfect team for each pokemon game.</span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
