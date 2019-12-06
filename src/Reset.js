import React from "react"
import { useHistory } from 'react-router-dom'

function Reset() {
    let history = useHistory()
    history.push("/start")
  return (
    <h1>Loading..</h1>
  );
}

export default Reset