import React, { useEffect, useState } from 'react'
import Message from './Message'
import io from "socket.io-client"

const socket = io.connect("http://localhost:8000")

export default function Chat() {
    const [room, setRoom] = useState('')
    const [messageform, setmessageform] = useState({
        message: "",
        time: ""
    })

    function sendMessage() {
        // console.log(messageform)
        socket.emit('send_message', { message:messageform, room:room})
    }
    function joinroom() {
        // console.log(messageform)
        socket.emit('join_room', room)
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
        })
    }, [socket])

    function addmessage(e) {
        let data = { ...messageform }
        data[e.target.name] = e.target.value
        setmessageform(data)
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
                            <div className="card-body">
                                <div className="card">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">An item</li>
                                        <li className="list-group-item">A second item</li>
                                        <li className="list-group-item">A third item</li>
                                        <li className="list-group-item">A third item</li>
                                        <li className="list-group-item">A third item</li>
                                        <li className="list-group-item">A third item</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="card" style={{ minHeight: "70vh", }}>
                            <div className="card-body">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer">
                                <div>
                                    <input type="number" className="form-control mb-2" id="room" name="room" value={room} placeholder="Message" onChange={e => setRoom(e.target.value)} />
                                    <button className="btn btn-primary me-md-2 float-end" type="button" onClick={joinroom}>Join Room</button>
                                </div>
                                <Message messageform={messageform} addmessage={addmessage} sendMessage={sendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
