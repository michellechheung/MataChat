import React, { useState, useEffect } from "react";
import { onSnapshot } from "@firebase/firestore";
import {
  writeMessageDB,
  loadMessagesDB,
  recentMessagesQuery,
  listChatRoomsDB
} from "../firebase-config";

function TestBackendOnly() {

  const [inputMessage, setInputMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [listRooms, setListRooms] = useState("");

  useEffect(() => {
    handleListRooms();
  });

  useEffect(() => {
    // Start listening to the query
    onSnapshot(recentMessagesQuery, function() {
      handleLoadMessage();
    });
  }, [displayMessage]);

  // Load and Display Messages
  const handleLoadMessage = async () => {
    let raw_string = "";
    let messages = await loadMessagesDB();
    for(let i=0; i<messages.length; i++){
      raw_string += `${messages[i].email}: ${messages[i].text}\n`;
    }
    setDisplayMessage(raw_string);
  }

  // Load and Display Chat Rooms
  const handleListRooms = async () => {
    let raw_string = "";
    let rooms = await listChatRoomsDB();
    for(let i=0; i<rooms.length; i++){
      raw_string += `${rooms[i].room_name} \n`;
    }
    setListRooms(raw_string);
  }

  // Send Messages to DB
  const handleSendMessage = (event) => {
    writeMessageDB(inputMessage);
  }

  const handleInputMessageChange = (e) => {
    const {id , value} = e.target;
    if(id === "message"){
        setInputMessage(value);
    }
  };

  return (
    <>
      <br />
      <label>Message: </label>
      <input type="text" onChange = {(e) => handleInputMessageChange(e)} id="message" placeholder="Enter message here" />
      <button onClick={()=>handleSendMessage()}>Send</button>
      <br />
      <label>messages:<br />{displayMessage}</label>
      <br />
      <label>rooms:<br />{listRooms}</label>
    </>
  );

}

export default TestBackendOnly;