import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListItem() {
  const [page, setPage] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [allItems, setAllItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllListItem()
  }, [page, limit])

  function getAllListItem() {
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    let payload = {
      email: userDetails.email,
      page: page,
      limit: limit
    }
    console.log(payload)
    fetch('http://localhost:8000/getAllItem', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": userDetails.token
      }
    }).then(res => res.json())
      .then(res => {
        if(res.data.length > 0) {
          setTotalPage(res.data[0].totalRecords)
          setAllItems(res.data)
        } else {
          setTotalPage(0)
          setAllItems([])
        }
      }).catch(err => {
        console.log(err)
      })
  }

  function editItem(ele) {
    // console.log(ele)
    sessionStorage.setItem("editTodo", JSON.stringify(ele))
    navigate("/additem")
  }

  function deleteItem(ele) {
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    // console.log(ele)
    fetch(`http://localhost:8000/deleteitem/${ele._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userDetails.token
      }
    }).then(res => res)
      .then(res => {
        console.log(res)
        getAllListItem()
      }).catch(err => console.log(err))
  }


  return (
    <>
      <h3 className="text-center m-4">List Of Todos</h3>
      {
        allItems.length > 0 ?
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">User Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allItems.map((ele, index) => {
                return (
                  <tr key={ele._id}>
                    <th>{index + 1}</th>
                    <td>{ele.title}</td>
                    <td>{ele.description}</td>
                    <td>{ele.email}</td>
                    <td>
                      <FontAwesomeIcon className="fa-solid" icon="fa-solid fa-pen-to-square" onClick={() => editItem(ele)} /> &nbsp; &nbsp;
                      <FontAwesomeIcon className="fa-solid" icon="fa-solid fa-trash" onClick={() => deleteItem(ele)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-end">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" >
                <select className="form-select" name="pageLimit" id="pageLimit" onChange={e => setLimit(e.target.value)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </li> &nbsp;
              <li className="page-item" >
                <button disabled={page == 0 ? true : false} onClick={() => setPage(page - 1)} className="btn btn-primary">
                  <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> Previous</button>
              </li> &nbsp;
              <li className="page-item" >
                <button disabled={totalpage - (page * limit) < limit ? true : false} onClick={() => setPage(page + 1)} className="btn btn-primary"> Next
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" /></button>
              </li>
            </ul>
          </nav>
        </div>
      </div> 
      :
      <div className="container">
        <h5 className="text-center">No Item Found <Link to="/additem">Create One</Link> </h5>
      </div>
      }
    </>
  );
}
