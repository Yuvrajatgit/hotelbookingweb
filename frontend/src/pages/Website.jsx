import React from 'react';
import Companies from "../components/companies/Companies";
import Hero from "../components/hero/Hero";
import Residencies from "../components/residencies/Residencies";
import Value from "../components/value/Value";
import Contact from "../components/contact/Contact";
import GetStarted from "../components/getStarted/GetStarted";


const Website = () => {
  return (
    <>
    <div className="App">
     <Hero/>
     <Companies/>
     <Residencies/>
     <Value/>
     <Contact/>
     <GetStarted/>
     </div>
    </>
  )
}

export default Website;
