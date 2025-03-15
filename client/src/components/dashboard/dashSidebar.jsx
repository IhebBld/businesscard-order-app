import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsPencil,
} from "react-icons/bs";

function DashSidebar({ openSidebarToggle, OpenSidebar, setAction }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <a href="/">
            <BsPencil className="icon_header" /> MyCardMaker
          </a>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <FaTimesCircle />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <button onClick={() => setAction("Dashboard")}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </button>
        </li>
        <li className="sidebar-list-item">
          <button onClick={() => setAction("Products")}>
            <BsFillArchiveFill className="icon" /> Order Submission
          </button>
        </li>

        <li className="sidebar-list-item">
          <button onClick={() => setAction("Customers")}>
            <BsPeopleFill className="icon" /> Customers
          </button>
        </li>
        <li className="sidebar-list-item">
          <button onClick={() => setAction("Order")}>
            <BsListCheck className="icon" /> Orders
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default DashSidebar;
