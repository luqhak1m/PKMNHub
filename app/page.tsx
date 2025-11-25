
import React from "react";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import PokemonList from "./components/Pokemon";
import AbilitiesList from "./components/Ability";

export default function HomePage() {
  return (
    <>
      <RegisterForm />
      <LoginForm />
      <PokemonList/>
      <AbilitiesList/>
    </>
  );
}
