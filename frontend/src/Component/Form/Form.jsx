import React, { useState } from 'react'

export default function Form() {
    const [form, setForm] = useState({
        title: "",
        description: ""
    })

    function addForm(e) {
        let data = { ...form }
        data[e.target.name] = e.target.value
        setForm(data)
    }

    function addItem() {
        let userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        let payload = {
            ...form,
            email : userDetails.email
        }
        console.log(payload)
        fetch('http://localhost:8000/additem', {
            method : "POST",
            body : JSON.stringify(payload),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : userDetails.token
            }
        }).then(res => res.json())
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='d-flex justify-content-center mt-4'>
            <div className="card" style={{ width: "36rem" }}>
                <div className="card-header">
                    Add Item
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Title" onChange={e => addForm(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={e => addForm(e)} />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" type="button" onClick={addItem}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
