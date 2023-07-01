import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

export default function ListItem() {
  const [page, setPage] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [allItems, setAllItems] = useState([]);
  const [downloadType, setDownloadType] = useState("EXCEL");

  const navigate = useNavigate();
  const conponentpdf = useRef()

  useEffect(() => {
    getAllListItem()
    downloadFile()
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
        if (res.data.length > 0) {
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

  function downloadFile() {
    console.log("Download File Type ", downloadType)
    if (downloadType === "TEXT") {
      let range, sel;
      const elTable = document.querySelector('table');
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(elTable);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(elTable);
        sel.addRange(range);
      }
      const element = document.createElement("a")
      const file = new Blob([sel], { type: "text/plain;charset=utf-8" })
      element.href = URL.createObjectURL(file)
      element.download = "download.txt"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      sel.removeAllRanges();
    } else if (downloadType === "COPY") {
      let range, sel;
      const elTable = document.querySelector('table');
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(elTable);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(elTable);
        sel.addRange(range);
      }
      document.execCommand('copy');
      // navigator.clipboard.writeText(sel)
      sel.removeAllRanges();
    }

  }

  const downlodPdf = useReactToPrint({
    content: () => conponentpdf.current,
    documentTitle: "Todo-List"
  })

  return (
    <>
      <h3 className="text-center m-4">List Of Todos</h3>
      <div className="container"  >
        <label>Download Result</label>
        <br />
        <select style={{ padding: "5px 10px" }} onChange={(e) => {
          setDownloadType(e.target.value)
          // downloadFile()
        }}>
          <option value="EXCEL">EXCEL</option>
          <option value="PDF">PDF</option>
          <option value="TEXT">TEXT</option>
          <option value="COPY">COPY</option>
        </select> &nbsp;
        {
          downloadType === "EXCEL" ?
            <CSVLink className="btn btn-primary" data={allItems}>Download EXCEL</CSVLink>
            :
            downloadType === "PDF" ?
              <button className="btn btn-primary" onClick={downlodPdf}>Download PDF</button>
              :
              downloadType === "TEXT" ?
                <button className="btn btn-primary" onClick={downloadFile}>Download TXT File</button>
                :
                <button className="btn btn-primary" onClick={downloadFile}>COPY</button>
        }
      </div>
      {
        allItems.length > 0 ?
          <div className="container" ref={conponentpdf} style={{ width: "100%" }}>
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
                        <th>{((page * limit) + index + 1)}</th>
                        <td>{ele.title}</td>
                        <td>{ele.description}</td>
                        <td>{ele.email}</td>
                        <td>
                          <FontAwesomeIcon className="fa-solid" icon="fa-solid fa-pen-to-square" onClick={() => editItem(ele)} /> &nbsp; &nbsp;
                          <FontAwesomeIcon className="fa-solid" icon="fa-solid fa-trash" onClick={() => {
                            deleteItem(ele)
                            downloadFile()
                          }} />
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
                    <select className="form-select" name="pageLimit" id="pageLimit" onChange={(e) => {
                      setLimit(e.target.value)
                      setTotalPage(0)
                      setPage(0)
                      downloadFile()
                    }}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </li> &nbsp;
                  <li className="page-item" >
                    <button disabled={page == 0 ? true : false} onClick={() => {
                      setPage(page - 1)
                      // downloadFile()
                    }} className="btn btn-primary">
                      <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> Previous</button>
                  </li> &nbsp;
                  <li className="page-item" >
                    <button disabled={totalpage - (page * limit) < limit ? true : false} onClick={() => {
                      setPage(page + 1)
                      // downloadFile()
                    }} className="btn btn-primary"> Next
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
