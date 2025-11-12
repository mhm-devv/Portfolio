import Canvas from "./Canvas"
import Home from "./Home";
import Header from "./Header";
import { useRef } from "react";
import './App.css'

const App = () => {
      const contactMeRef = useRef(null);
      const projectsRef = useRef(null);
      const homeRef = useRef(null);
  return <>    <Canvas></Canvas>
<main>
    <Header contactMeRef={contactMeRef} homeRef={homeRef} projectsRef={projectsRef}></Header>
    <Home contactMeRef={contactMeRef} homeRef={homeRef} projectsRef={projectsRef}></Home>
  </main></>
}

export default App;