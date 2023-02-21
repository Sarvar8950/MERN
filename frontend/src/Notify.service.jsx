import { useEffect, useState } from "react"
import "./Notify.service.css"

export function Notify({ type = "Info", msg = "Message", bgcolor = "white", time = "3000" }) {
    const [display, setDisplay] = useState("block")
    useEffect(() => {
        setTimeout(() => {
            setDisplay("none")
        }, time);
    }, [])
    return (
        <div className="notify" style={{ "background": bgcolor, "display": display }}>
            <div className="notifybox">
                <p className="type"><b>{type}</b></p>
                <p className="message">{msg}</p>
            </div>
        </div>
    )
}