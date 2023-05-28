import { DashListItem } from "@didyoumeantoast/dash-components-react";
import React from "react";
import "./NavListItem.css";

export default function NavListItem({ title, description, icon, href } = {}) {
  return (
    <DashListItem className="nav-list-item" href={href}>
      <span className="nli-icon" slot="actions-start">
        {icon}
      </span>
      <div className="nli-content">
        <span className="nli-title">{title}</span>
        <span className="nli-description">{description}</span>
      </div>
    </DashListItem>
  );
}
