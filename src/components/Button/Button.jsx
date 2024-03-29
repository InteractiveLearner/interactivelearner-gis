import { DashButton } from "@didyoumeantoast/dash-components-react";
import React from "react";
import "./Button.css";

// TODO: create a solid variant of the dash-button
export default function Button({
  children,
  className,
  scale,
  disabled,
  appearance,
  onClick,
  href,
  target,
  status,
  endIcon,
} = {}) {
  const isShadowAppearance = appearance === "shadow";
  appearance = isShadowAppearance ? null : appearance;

  return (
    <DashButton
      className={
        "button " + (className ?? "") + (isShadowAppearance ? "shadow" : "")
      }
      appearance={appearance}
      scale={scale}
      disabled={disabled ? true : null}
      href={href}
      target={target}
      status={status}
      endIcon={endIcon}
      onClick={(e) => {
        if (!disabled) {
          onClick?.(e);
        }
      }}
    >
      {children}
    </DashButton>
  );
}
