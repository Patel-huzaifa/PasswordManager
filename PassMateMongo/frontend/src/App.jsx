import "./App.css";
import React from "react";
import Navbar from "./Componets/Navbar";
import Manager from "./Componets/Manager";
import Footer from "./Componets/Footer";
function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="min-h-[84.7vh]">
          <Manager />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
