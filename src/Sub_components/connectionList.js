import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import md5 from "blueimp-md5";
import MDEditor from "@uiw/react-md-editor";
import Pagination from "react-bootstrap/Pagination";
import { getUser } from "../services/userService";
import { useEffect } from "react";
import "../Styles/connectionsList.css";

function ConnectionList(Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [displayConnections, setDisplayConnections] = useState([
    ...Props.connections,
  ]);
  useEffect(() => {
    console.log(displayConnections);
  }, []);

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(Props.connections.length / 5)
    ) {
      return;
    }
    setPageNumber(pageNumber);
    const currentConnections = Props.connections.slice(
      pageNumber * 5 - 1,
      (pageNumber + 1) * 5
    );
    setDisplayConnections(
      currentConnections.map((item) => {
        return getUser(item.id).then((data) => {
          return data.json.then((user) => {
            console.log(user);
            return { ...user.user, order: item.order };
          });
        });
      })
    );
  };
  useEffect(() => {
    paginate(1);
  }, []);

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(Props.connections.length / 5);

    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageNumber}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <>
      <div className="connection-container">
        <div className="connection-title">
          <h1>connections</h1>
          <p>423 connections</p>
        </div>
        <div className="connection-list">
          <div className="connection-card-list">
            <div className="connection-card">
              <div className="connection-order">
                <p>
                  order: <strong>243</strong>
                </p>
              </div>
              <div className="connection-img">
                <img
                  src={"https://www.gravatar.com/avatar/j1212kj2/?d=identicon"}
                  alt="Not found"
                />
              </div>
              <div className="connection-name">
                <h1>Lucthegoose</h1>
              </div>
            </div>
            <div className="connection-delete">
              <button type="button" >
                <DeleteIcon sx={{ color: "white" }} fontSize="large" />
              </button>
            </div>
          </div>
        </div>
        {/* {displayConnections.map((item, key) => {
          return (
            <div className="connection_card">
              <div className="connection_order">
                <p>{item.order}</p>
              </div>
              <div className="connection_img">
                <img
                  src={
                    "https://www.gravatar.com/avatar/" +
                    md5(("" + item.email).toLowerCase().trim("" + item.email)) +
                    "?d=identicon"
                  }
                  alt="Not found"
                />
              </div>
              <div className="connection_name">
                <h1>{item.username}</h1>
              </div>
              <div className="connection_delete">
                <button>
                  <DeleteIcon sx={{ color: "black" }} fontSize="large" />
                </button>
              </div>
            </div>
          );
        })}*/}
      </div>
      <div className="pagination">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(pageNumber - 1)} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => paginate(pageNumber + 1)} />
        </Pagination>
      </div>
    </>
  );
}

export default ConnectionList;
