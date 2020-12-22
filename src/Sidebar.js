import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
//import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import CreateIcon from '@material-ui/icons/Create'
import SettingsIcon from '@material-ui/icons/Settings'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("Please enter a chat name");

    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <h2>Chats</h2>
        <IconButton className="sidebar__inputBtn1st">
          <SettingsIcon className="sidebar__settingsIcon"  />
        </IconButton>
        <IconButton className="sidebar__inputBtn">
          <VideoCallIcon className="sidebar__vidcallIcon" />
        </IconButton>
        <IconButton  className="sidebar__inputBtn">
          <CreateIcon className="sidebar__createIcon" onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__input">
          <SearchIcon className="sidebar__search" />
          <input placeholder="Search Messenger" />
        </div>


      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
