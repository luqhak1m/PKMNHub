
import React from "react";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import PokemonList from "./components/Pokemon";

export default function HomePage() {
  return (
    <>
      <RegisterForm />
      <LoginForm />
      <PokemonList/>
    </>
  );
}
