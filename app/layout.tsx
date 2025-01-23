import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  title: "CODE4CODE",
  description:
    "Changing the World One Line at a Time—Because No One Else Can. CODE4CODE isn’t just another player in the tech industry—we’re the architects of tomorrow. While others scramble to keep up, we’re already ten steps ahead, writing the code that defines the future. Our solutions aren’t just innovative; they’re inevitable. With a team of visionaries, we don’t follow trends—we create them. If you think you’ve seen bold, think again. Welcome to CODE4CODE, where everything you know is about to change.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="black" />
      </head>
      <body className={`antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
