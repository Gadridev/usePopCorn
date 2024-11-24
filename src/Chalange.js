import React, { useState } from "react";
import "./Chalang.css";
function Chalange() {
  return (
    <>
      <div>
        {/* Tdefault=10 false=btn=10 */}
    
        <TextExpander expandButtonText="show more">
          Space travel is the ultimate adventure! Imagine soaring pastthe stars
          and exploring new worlds. It's the stuff of dreams and science
          fiction, but believe it or not, space travel is a real thing. Humans
          and robots are constantly venturing out into the cosmos to uncover its
          secrets and push the boundaries of what's possible.
        </TextExpander>

        <TextExpander
          collapsedNumWords={20}
          expandButtonText="Show text"
          collapseButtonText="Collapse text"
          buttonColor="#ff6622"
        >
          Space travel requires some seriously amazing technology and
          collaboration between countries, private companies, and international
          space organizations. And while it's not always easy (or cheap) ...,
          the results are out of this world. Think about the first time humans
          stepped foot on the moon or when rovers were sent to roam around on
          Mars.
        </TextExpander>

        <TextExpander expanded={true} className="box">
          Space missions have given us incredible insights into our universe and
          have inspired future generations to keep reaching for the stars. Space
          travel is a pretty cool thing to think about. Who knows what we'll
          discover next!
        </TextExpander>
      </div>
    </>
  );
}

export default Chalange;

function TextExpander({
  children,
  expandButtonText = "Show more",
  collapsedNumWords = 10,
  collapseButtonText = "show Less",
  buttonColor = "#0000FF",
  className,
  expanded = false,
}) {
  const [isexpanded, Setisexpanded] = useState(expanded);
  const isexpandedLogic = isexpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
  const styleBtn = {
    color: buttonColor,
    border: "none ",
    backgroundColor: "transparent",
    fontSize: "20px",
  };
  return (
    <div className={className}>
      <span>{isexpandedLogic}</span>
      <span>
        <button style={styleBtn} onClick={() => Setisexpanded(!isexpanded)}>
          {isexpanded ? collapseButtonText : expandButtonText}
        </button>
      </span>
    </div>
  );
}
