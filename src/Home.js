import React from "react"
import { useHistory } from 'react-router-dom'
import './App.css'
import rocket from './rocket.png'

function Home() {
  let history = useHistory()
  const [compDisplay, setCompDisplay] = React.useState("block")
  const [rocketAni, setRocketAni] = React.useState("rocketimghome")

  const handleStart = () => {
    setCompDisplay("none");
    setRocketAni("rocket-ani")
    setTimeout(function () {
        history.push("/start")
    }, 2000);
  }

  return (
    <div>
    <div className="rocket-tab-home">
                <img className={rocketAni} src={rocket} alt="rocket" />
            </div>
    <h1 className="title" style={{display: compDisplay}}>Space Explorer</h1>
    <p className="description-home" style={{display: compDisplay}}>See how far you can travel in space while also keeping track of <br /> your budget and resources!</p>
    <div style={{display: compDisplay}} className="btn-div">
    <button onClick={handleStart} className="startbtn">Play!</button>

    </div>
    </div>
  );
}

export default Home