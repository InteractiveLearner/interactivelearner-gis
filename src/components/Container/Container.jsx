import React from "react";
import "./Container.css";

export default function Container({ children, className } = {}) {
  return <div className={"container " + (className ?? "")}>{children}</div>;
}
