import React from 'react';
import CheckBoxes from "./CheckBoxes";
import GenPass from "./GenPass";
import PassBar from "./PassBar";
import PassState from "./PassState";
import Range from "./Range";
import "./sass/style.scss";

function PassGenerator() {
  return (
    <div className="passgen-wrapper">
      <PassBar />
      <div className="bottom">
        <Range />
        <CheckBoxes />
        <PassState />
        <GenPass />
      </div>
    </div>
  );
}

export default PassGenerator;
