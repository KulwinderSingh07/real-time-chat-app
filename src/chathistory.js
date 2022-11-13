import { useEffect, useState } from "react";
import React_scroll_to_bottom from "react-scroll-to-bottom";
import sendLogo from "./images/send.png";
const Chathandler = ({ alias, roomnumber, socket }) => {
  const [message_to_be_sent, setmessagetobesent] = useState("");
  const [messagearr, setmessagearr] = useState([]);
  socket.on("joined", (data) => {
    alert(`new user joined`);
  });
  const messagehandler = async () => {
    if (message_to_be_sent !== "") {
      const data_to_be_sent = {
        username: alias,
        room: roomnumber,
        message: message_to_be_sent,
      };
      setmessagearr((list) => [...list, data_to_be_sent]);
      await socket.emit("send_message", data_to_be_sent);
      setmessagetobesent("");
    }
  };
  const recievedata = async () => {
    await socket.on("recieve_message", (data) => {
      if (data.username !== alias) {
        setmessagearr((list) => [...list, data]);
      }
    });
  };
  useEffect(() => {
    recievedata();
    return () => {
      socket.off();
    };
  }, [messagearr]);
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>I CHAT</h2>
        </div>
        <React_scroll_to_bottom className="chatBox">
          {messagearr.map(function (value) {
            if (value.username === alias) {
              return (
                <div className="right">
                  <b>{value.username}</b>:{value.message}
                </div>
              );
            } else {
              return (
                <div className="left">
                  <b style="tex">{value.username}</b>:{value.message}
                </div>
              );
            }
          })}
        </React_scroll_to_bottom>
        <div className="inputBox">
          <input
            placeholder="Message..."
            onChange={(event) => {
              setmessagetobesent(event.target.value);
            }}
            id="chatInput"
          />
          <button
            onClick={() => {
              messagehandler();
            }}
            className="sendBtn"
          >
            <img src={sendLogo} alt="" Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chathandler;
