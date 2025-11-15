import React from "react";
import "./styles/global.css";
import Providers from "./providers/Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
