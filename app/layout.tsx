import React from "react";
import "./styles/global.css";
import Providers from "./providers/Providers";
import Link from "next/link";
import "./styles/navbar.css";

export const metadata = {
  title: "PKMNHub",
  description: "A Pokémon hub",
};

export default function RootLayout({
  children, // children prop
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>    
      <nav className="nav-container-div">
          <ol id="ordered-list">
            <h1>PKMNHub</h1>
            <li><Link href="/">Home</Link></li>
            <li>
              <p>Pokemon Data</p>
              <ul className="nav-dropdown">
                <li><Link href="/pages/pokemon">Pokemon</Link></li>
                <li><Link href="/pages/ability">Ability</Link></li>
                <li>Nature</li>
              </ul>
            </li>
          </ol>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
