import React, { useEffect, useState } from "react";
import "./InteractiveBackground.css";
type Props = {};

const InteractiveBackground = (props: Props) => {
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [mousePos2, setMousePos2] = useState<[number, number]>([0, 0]);
  const [mousePos3, setMousePos3] = useState<[number, number]>([0, 0]);
  const [mousePos4, setMousePos4] = useState<[number, number]>([0, 0]);
  const [mousePos5, setMousePos5] = useState<[number, number]>([0, 0]);

  const handleMouseFollow = (e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    setTimeout(() => {
      setMousePos([clientX, clientY]);
    }, 50);
    setTimeout(() => {
      setMousePos2([clientX, clientY]);
    }, 70);
    setTimeout(() => {
      setMousePos3([clientX, clientY]);
    }, 90);
    setTimeout(() => {
      setMousePos4([clientX, clientY]);
    }, 110);
    setTimeout(() => {
      setMousePos5([clientX, clientY]);
    }, 110);
  };

  return (
    <div className="interactive" onMouseMove={(e) => handleMouseFollow(e)}>
      <div className="cursor">
        <div className="light1"></div>
        <div className="light2"></div>
      </div>
      {/* <div className="lightbulb lightbulb__1" style={{ transform: `translate3d(calc(-50% + ${mousePos[0]}px), calc(-50% + ${mousePos[1]}px), 0)` }}></div>
      <div className="lightbulb lightbulb__2" style={{ transform: `translate3d(calc(-50% + ${mousePos2[0]}px), calc(-50% + ${mousePos2[1]}px), 0)` }}></div>
      <div className="lightbulb lightbulb__3" style={{ transform: `translate3d(calc(-50% + ${mousePos3[0]}px), calc(-50% + ${mousePos3[1]}px), 0)` }}></div>
      <div className="lightbulb lightbulb__4" style={{ transform: `translate3d(calc(-50% + ${mousePos4[0]}px), calc(-50% + ${mousePos4[1]}px), 0)` }}></div>
      <div className="lightbulb lightbulb__5" style={{ transform: `translate3d(calc(-50% + ${mousePos5[0]}px), calc(-50% + ${mousePos5[1]}px), 0)` }}></div> */}
    </div>
  );
};

export default InteractiveBackground;
