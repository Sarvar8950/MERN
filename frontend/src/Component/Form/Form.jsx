import React, { useEffect, useState } from 'react'

export default function Form() {
    const [form, setForm] = useState({
        title: "",
        description: ""
    })
    const [editMode, setEditMode] = useState(null)

    useEffect(() => {
        let editData = JSON.parse(sessionStorage.getItem("editTodo"))
        if (editData) {
            let obj = {
                title: editData.title,
                description: editData.description
            }
            setEditMode(editData)
            setForm(obj)
            sessionStorage.removeItem("editTodo")
        }
    }, [])

    function addForm(e) {
        let data = { ...form }
        data[e.target.name] = e.target.value
        setForm(data)
    }

    function addItem() {
        let userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
        let payload;
        if (editMode) {
            payload = {
                ...editMode,
                ...form,
                time: new Date()
            }
        } else {
            payload = {
                ...form,
                email: userDetails.email,
                time: new Date()
            }
        }
        // console.log(payload)
        if (editMode) {
            delete payload.totalRecords
            fetch('http://localhost:8000/edititem', {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userDetails.token
                }
            }).then(res => res)
                .then(res => {
                    // console.log(res)
                    setForm({
                        title: "",
                        description: ""
                    })
                    setEditMode(null)
                }).catch(err => {
                    console.log(err)
                })
        } else {
            fetch('http://localhost:8000/additem', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userDetails.token
                }
            }).then(res => res.json())
                .then(res => {
                    // console.log(res)
                    setForm({
                        title: "",
                        description: ""
                    })
                    setEditMode(null)
                }).catch(err => {
                    console.log(err)
                })
        }
        
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
                        <input type="text" className="form-control" id="title" name="title" value={form.title} placeholder="Title" onChange={e => addForm(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={form.description} placeholder="Description" onChange={e => addForm(e)} />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" disabled={(form.title .length < 1 || form.description.length < 1) ? true : false} type="button" onClick={addItem}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
