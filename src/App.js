import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import rocket from './rocket.png'
import { useHistory, Link } from "react-router-dom"

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  let history = useHistory();
  const [distance, setDistance] = useState(0)
  const [money, setMoney] = useState(2500)
  const [earnings, setEarnings] = useState(50)
  const [oxygen, setOxygen] = useState(5)  
  const [fuel, setFuel] = useState(10)
  const [speed, setSpeed] = useState(8)
  const [oxygenCost, setOxygenCost] = useState(2500)  
  const [fuelCost, setFuelCost] = useState(1500)
  const [speedCost, setSpeedCost] = useState(500)
  const [earningsCost, setEarningsCost] = useState(3000)
  const [fuelEfficiency, setFuelEfficiency] = useState(1)
  const [fuelEfficiencyCost, setFuelEfficiencyCost] = useState(1700)
  const [gameOver, setGameOver] = useState(false)
  const [overReason, setOverReason] = useState("")
  const [score, setScore] = useState(0)
  const fuelIncrease = 15
  const oxygenIncrease = 10
  const speedIncrease = 1
  const earningsIncrease = 20
  const fuelEfficiencyIncrease = 0.2

  useInterval(() => {
    setDistance(distance + 1);
  }, 1000/speed);

  useInterval(() => {
    setMoney(money + 1);
  }, 1000/earnings);

  useInterval(() => {
    setFuel(fuel - 1);
    if(fuel <= 1 && !gameOver) {
      setGameOver("block")
      setOverReason("fuel")
      setScore(distance)
    }
  }, 100000*fuelEfficiency/speed);

  useInterval(() => {
    setOxygen(oxygen - 1);
    if(oxygen <= 1 && !gameOver) {
      setGameOver("block")
      setOverReason("oxygen")
      setScore(distance)
    }
  }, 15000);

  const buyOxygen = () => {
    if(money > oxygenCost) {
      setMoney(money - oxygenCost)
      setOxygen(oxygen + oxygenIncrease)
      setOxygenCost(Math.round(oxygenCost+1000))
    }
  }

  const buyFuel = () => {
    if(money > fuelCost) {
      setMoney(money - fuelCost)
      setFuel(fuel + fuelIncrease)
      setFuelCost(Math.round(fuelCost+1000))
    }
  }

  const buySpeed = () => {
    if(money > speedCost) {
      setMoney(money - speedCost)
      setSpeed(speed + speedIncrease)
      setSpeedCost(Math.round(speedCost+500))
    }
  }

  const buyEarnings = () => {
    if(money > earningsCost) {
      setMoney(money - earningsCost)
      setEarnings(earnings + earningsIncrease)
      setEarningsCost(Math.round(earningsCost+1500))
    }
  }

  const buyFuelEfficiency = () => {
    if(money > fuelEfficiencyCost) {
      setMoney(money - fuelEfficiencyCost)
      setFuelEfficiency(fuelEfficiency + fuelEfficiencyIncrease)
      setFuelEfficiencyCost(Math.round(fuelEfficiencyCost+1000))
    }
  }


  return (
    
    <div>
    <div id="overlay" style={{display: gameOver}}>
      <div className="overlay-box">
        <img src={rocket} style={{paddingTop: 10}} alt="rocket" className="rocketimghome"></img>
        <h1>Oh No! You ran out of {overReason}!</h1>
        <p>You travelled {score}km!</p>
       <button onClick={() => history.push("/reset")} style={{marginRight:10, marginBottom:20}}className="startbtn">Play Again!</button>
        <Link to="/"><button className="startbtn">Home</button></Link>
      </div>

    </div>
      <Link to="/" style={{textDecoration: "none"}}><h1 className="title fade-ani">Space Explorer</h1></Link>
    <div className="upgrades-tab fade-ani">
            <h2>Upgrades</h2>
            <p><button disabled={money < oxygenCost} onClick={buyOxygen} className="button">Oxygen (+{oxygenIncrease} Tanks) - ${oxygenCost}</button></p>
            <p><button disabled={money < fuelCost} onClick={buyFuel} className="button">Fuel (+{fuelIncrease} Tanks) - ${fuelCost}</button></p>
            <p><button disabled={money < speedCost} onClick={buySpeed} className="button">Speed (+{speedIncrease}km/s) - ${speedCost}</button></p>
            <p><button disabled={money < fuelEfficiencyCost} onClick={buyFuelEfficiency} className="button">Fuel Efficiency (+{fuelEfficiencyIncrease}) - ${fuelEfficiencyCost}</button></p>
            <p><button disabled={money < earningsCost} onClick={buyEarnings} className="button">Funding (+${earningsIncrease}/s) - ${earningsCost}</button></p> 
    </div>
    <div className="stats-tab fade-ani">
            <h2>Stats</h2>
            <p><strong>Distance Travelled:</strong> {distance}km</p>
            <p><strong>Funding:</strong> ${earnings}/s</p>
            <p><strong>Fuel Efficiency:</strong> x{Math.round(10*fuelEfficiency)/10}</p>
            <p><strong>Speed:</strong> {speed}km/s</p> 
        </div>
    <div className="resources-tab fade-ani">
            <h2>Resources</h2>
            <p><strong>Money:</strong> ${money} (${earnings}/s)</p>            
            <p><strong>Oxygen:</strong> {oxygen} tank(s)</p>
            <p><strong>Fuel:</strong> {fuel} tank(s)</p>
        </div>
    
    <div className="rocket-tab">
        <img src={rocket} alt="rocket" className="rocketimg" />
    </div>
    </div>
  );
}

export default App;
