import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chathandler from "./chathistory";
import logo from "./images/logo.png";
const socket = io.connect("http://localhost:3001");
function App() {
  const [alias, setalias] = useState("");
  const [showchat, setshowchat] = useState(false);
  const [roomnumber, setroomnumber] = useState("");
  const roomhandler = () => {
    if (roomnumber !== "") {
      socket.emit("join_room", { roomnumber: roomnumber, alias: alias });
      setshowchat(true);
    }
  };

  return (
    <div className="JoinPage">
      {!showchat ? (
        <div className="JoinContainer">
          <img src={logo} alt="logo" />
          <h1>I CHAT</h1>
          <input
            placeholder="Alias..."
            onChange={(event) => {
              setalias(event.target.value);
            }}
            id="joinInput"
          ></input>
          <input
            placeholder="Chat Room..."
            onChange={(event) => {
              setroomnumber(event.target.value);
            }}
            id="joinInput"
          ></input>
          <button onClick={roomhandler} className="joinbtn">
            Join Room
          </button>
        </div>
      ) : (
        <Chathandler alias={alias} roomnumber={roomnumber} socket={socket} />
      )}
    </div>
  );
}

export default App;
