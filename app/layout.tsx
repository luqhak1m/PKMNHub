import React from "react";


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
        {children}
      </body>
    </html>
  );
}
