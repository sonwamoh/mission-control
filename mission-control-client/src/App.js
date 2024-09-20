import React from "react";
import CommandForm from "./components/CommandForm";
import Status from "./components/Status";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Mission Control</h1>
      </header>
      <main>
        <CommandForm />
        <Status />
      </main>
    </div>
  );
};

export default App;
