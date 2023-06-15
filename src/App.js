
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import "./styles.css";
import Home from './components/pages/Home';
import Check from './components/pages/Check';
import Tips from './components/pages/Tips';
import SignUp from './components/pages/SignUp';

export default function App() {
  
  return (
   
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' exact element={ <Home />}></Route>
        <Route path='/check' exact element={ <Check />}></Route>
        <Route path='/tips' exact element={ <Tips />}></Route>
        <Route path='/SignUp' exact element={ <SignUp />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}
