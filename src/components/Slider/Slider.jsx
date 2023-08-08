import { DashLabel, DashSlider } from "@didyoumeantoast/dash-components-react";
import React from "react";
import "./Slider.css";

export default function Slider({
  label,
  value,
  min,
  max,
  minLabelWidth,
  maxLabelWidth,
  onSliderValueChange,
} = {}) {
  return (
    <DashLabel className="slider">
      <div className="slider-label-container">
        <span className="slider-label">{label}</span>
        <span className="slider-value">({value})</span>
      </div>
      <DashSlider
        value={value}
        min={min}
        max={max}
        minLabelWidth={minLabelWidth}
        maxLabelWidth={maxLabelWidth}
        step={1}
        minMaxLabelsVisible={true}
        onDashSliderValueChanged={(e) => onSliderValueChange?.(e.target.value)}
      ></DashSlider>
    </DashLabel>
  );
}
