import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ThemeProvider } from "next-themes";
import { Fragment } from "react";
import Head from "next/head";

export const metadata = {
  title: "PromptMaker",
  description: "Discover & Generate AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <Fragment>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </Fragment>
    </ThemeProvider>
  );
};

export default RootLayout;
