import { DashButton } from "@didyoumeantoast/dash-components-react";
import React from "react";

// TODO: create a solid variant of the dash-button
export default function Button({ children } = {}) {
  return <DashButton>{children}</DashButton>;
}
