import React, { useEffect, useState } from 'react'
import Message from './Message'
import io from "socket.io-client"

const socket = io.connect("http://localhost:8000")

export default function Chat() {
    const [userDetails, setUserdetails] = useState()
    const [chat, setChat] = useState([])
    const [receiver, setReceiver] = useState()
    const [allUsers, setAllUsers] = useState([])
    const [room, setRoom] = useState('0')
    const [messageform, setmessageform] = useState({
        message: "",
        time: new Date(),
        sender: '',
        receiver: ''
    })
    const [editMessageMode, setEditMessageMode] = useState(false)

    let chatGroup = []

    useEffect(() => {
        setUserdetails(JSON.parse(sessionStorage.getItem("userDetails")))
        getAllusers()
    }, [])

    useEffect(() => {
        // Receive messages from other user 
        socket.on("receive_message", (data) => {
            chatGroup = []
            receiveMessage(data.message.sender)
            receiveMessageforReceiver(data.message.sender)
        })
        socket.on("reload_chat", (data) => {
            // console.log(data)
            chatGroup = []
            receiveMessage(data.message.sender)
            receiveMessageforReceiver(data.message.sender)
        })
    }, [socket])

    // send message to other user 
    function sendMessage() {
        if (messageform.message.length < 2) {
            return;
        }
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        socket.emit('send_message', { message: messageform, room: room })
        fetch(`http://localhost:8000/chat/sendMessage`, {
            method: "POST",
            body: JSON.stringify(messageform),
            headers: {
                "Content-Type": "application/json",
                "Authorization": userDetails.token
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                setmessageform({
                    message: "",
                    time: new Date(),
                    sender: '',
                    receiver: ''
                })
                receiveMessage(null)
                receiveMessageforReceiver(null)
            }).catch(err => console.log(err))
    }

    function receiveMessage(reseiverid) {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        fetch(`http://localhost:8000/chat/receiveMessage/${userDetails._id}/${reseiverid ? reseiverid : receiver._id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": userDetails.token
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res.data)
                chatGroup = res.data
            }).catch(err => console.log(err))
    }

    function receiveMessageforReceiver(reseiverid) {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        fetch(`http://localhost:8000/chat/receiveMessage/${reseiverid ? reseiverid : receiver._id}/${userDetails._id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": userDetails.token
            }
        }).then(res => res.json())
            .then(res => {
                // console.log("for reeceiver", res.data)
                let result = [...chatGroup, ...res.data]
                for (let i = 0; i < result.length; i++) {
                    for (let j = i + 1; j < result.length; j++) {
                        if (Date.parse(result[i].time) > Date.parse(result[j].time)) {
                            [result[i], result[j]] = [result[j], result[i]]
                        }
                    }
                }
                console.log(res.data)
                setChat(result)
            }).catch(err => console.log(err))
    }

    // Get List of all users 
    function getAllusers() {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        fetch(`http://localhost:8000/chat/allusers/${userDetails.email}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": userDetails.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.responseStatus == "SUCCESS") {
                    console.log(res)
                    setAllUsers(res.data)
                    setReceiver(res.data[0])
                    receiveMessage(res.data[0]._id)
                    receiveMessageforReceiver(res.data[0]._id)
                } else {
                    setAllUsers([])
                }
            }).catch(err => console.log(err))
    }

    // add message 
    function addmessage(e) {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        let data = { ...messageform, time: new Date(), sender: userDetails._id, receiver: receiver._id }
        data[e.target.name] = e.target.value
        setmessageform(data)
    }

    // Delete Message 
    function deleteMessage(data) {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        socket.emit('delete_message', { message: data, room: room })
        fetch(`http://localhost:8000/chat/deleteMessage/${data._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": userDetails.token
            }
        })
            .then(() => {
                receiveMessage(null)
                receiveMessageforReceiver(null)
            })
    }

    return (
        <>
            <h3>Chat App</h3>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                All Members
                            </div>
                            <div className="card-body" style={{ minHeight: "70vh", overflowY: "scroll" }}>
                                <div className="card">
                                    <table className="table table-striped">
                                        <tbody>
                                            {
                                                allUsers.map((item, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => {
                                                            // console.log(item._id, userDetails._id)
                                                            setReceiver(item)
                                                            receiveMessage(item._id)
                                                            receiveMessageforReceiver(item._id)
                                                        }}>
                                                            <td><button className='btn'>{item.firstName} {item.lastName}</button></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="card" >
                            <div className="card-header">
                                {receiver?.firstName} {receiver?.lastName}
                            </div>
                            <div className="card-body" style={{ height: "55vh", overflowY: "scroll" }}>
                                {
                                    chat.map((message, index) => {
                                        return (
                                            <>
                                                {
                                                    userDetails._id === message.sender ?
                                                        <p className="card-text p-3 mb-2 bg-primary text-white text-end" key={Math.random() + message.message}>{message.message}</p>
                                                        :
                                                        <p className="card-text p-3 mb-2 bg-secondary text-white" key={Math.random() + message.message}>{message.message}</p>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="card-footer">
                                {/* <div>
                                    <input type="number" className="form-control mb-2" id="room" name="room" value={room} placeholder="Message" onChange={e => setRoom(e.target.value)} />
                                    <button className="btn btn-primary me-md-2 float-end" type="button" onClick={joinroom}>Join Room</button>
                                </div> */}
                                <Message messageform={messageform} addmessage={addmessage} sendMessage={sendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
