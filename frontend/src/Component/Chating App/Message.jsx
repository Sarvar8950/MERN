import React from 'react'

export default function Message({ messageform, addmessage, sendMessage }) {
    return (
        <div>
            <input type="text" className="form-control mb-2" id="message" name="message" value={messageform.message} placeholder="Message" onChange={e => addmessage(e)} />
            <button className="btn btn-primary me-md-2 float-end" type="button" onClick={sendMessage}>Send Message</button>
        </div>
    )
}
