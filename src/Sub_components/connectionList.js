import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import md5 from "blueimp-md5";
import MDEditor from "@uiw/react-md-editor";
import Pagination from "react-bootstrap/Pagination";
import { getUser } from "../services/userService";
import { useEffect } from "react";
import { createConnections } from "../services/connectionService";
import "../Styles/connectionsList.css";

function ConnectionList(Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [displayConnections, setDisplayConnections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const conns = await createConnections(Props.user_id);
      const temp = [];
      conns.forEach(async (connection) => {
        const user = await getUser(connection.user_id);
        temp.push({ user: user.user, order: connection.order });
      });
      console.log(temp);
      setDisplayConnections(temp);
    };
    fetchData(); // Invoke the async function
  }, []);

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(displayConnections.length / 5)
    ) {
      return;
    }
    setPageNumber(pageNumber);
    const currentConnections = displayConnections.slice(
      pageNumber * 5 - 1,
      (pageNumber + 1) * 5
    );
  };
  useEffect(() => {
    paginate(1);
  }, []);

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(displayConnections.length / 5);

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
          <p>{displayConnections && displayConnections.length} connections</p>
        </div>
        <div className="connection-list">
          {displayConnections &&
            displayConnections.map((item, key) => {
              console.log(item);
              return (
                <div key={key} className="connection-card-list">
                  <div className="connection-card" key={key}>
                    <div className="connection-order">
                      <p>
                        <strong>{item.order}</strong>
                      </p>
                    </div>
                    <div className="connection-img">
                      <img
                        src={
                          "https://www.gravatar.com/avatar/" +
                          md5(
                            ("" + item.user.email)
                              .toLowerCase()
                              .trim("" + item.user.email)
                          ) +
                          "/?d=identicon"
                        }
                        alt="Not found"
                      />
                    </div>
                    <div className="connection-name">
                      <h1>{item.user.username}</h1>
                    </div>
                    <div className="connection-delete">
                      <button type="button">
                        <DeleteIcon sx={{ color: "white" }} fontSize="large" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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
