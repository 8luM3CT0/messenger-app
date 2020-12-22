import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import { selectChatId, selectChatName } from './features/chatSlice';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
 
import CallIcon from '@material-ui/icons/Call'
import VideocamIcon from '@material-ui/icons/Videocam'
import InfoIcon from '@material-ui/icons/Info'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';



function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const [messages, setMessages] = useState([]);
    const chatId = useSelector(selectChatId);

    useEffect(() => {
        if(chatId){
            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(
                    snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    })

    const sendMessage = (e) => {
        e.preventDefault();
    
        db.collection("chats").doc(chatId).collection("messages").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          uid: user.uid,
          photo: user.photo,
          email: user.email,
          displayName: user.displayName,
        });
    
        setInput("");
      };
    
//<h4>To: <span className="chat__span">{chatName}</span></h4>
    return (
        <div className="chat">
            <div className="chat__header">
                <strong className="chat__span">{chatName}</strong>
            <IconButton className="chat__btns1st">
                        <CallIcon />
                    </IconButton>
                    <IconButton className="chat__btns">
                        <VideocamIcon />
                    </IconButton>
                    <IconButton className="chat__btns">
                        <InfoIcon />
                    </IconButton>
            </div>
           

            <div className="chat__message">
                <FlipMove>
                {messages.map(({id, data}) => (
                    <Message key={id} contents={data} />
                ))}
                </FlipMove>
            </div>

            {/**chat input */}
            <div className="chat__input">
                    <AddCircleIcon className="fter__icons__add" />
                    <GifIcon className="fter__icons__gif" />
                    <NoteAddIcon className="fter__icons__share" />
                    <InsertPhotoIcon className="fter__icons__photo" />

                <form>
                    <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a message..." 
                    type="text"
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                    <EmojiEmotionsIcon className="chat__emoji" />
                <IconButton className="chat__btns">
                    <ThumbUpIcon className="chat__thumbsUp" />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
