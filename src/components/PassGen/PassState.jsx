import { useContext, useEffect, useRef } from "react";
import PassContext from "./context/PassContext";

function PassInput({ hanldeChange, value, isChecked, id }) {
  return (
    <input
      onChange={hanldeChange}
      type="radio"
      name="pass-config"
      id={id}
      value={value}
      className="radio-btn radio-btn-1 custom"
      checked={isChecked}
    />
  );
}

function PassState() {
  const tabPos = useRef(null);
  const { passState, setPassState, setCheckState, setLength } =
    useContext(PassContext);
  function hanldeChange(event) {
    setPassState({
      custom: false,
      basic: false,
      strong: false,
      [event.target.value]: true,
    });
    if (event.target.value === "custom") {
      setCheckState({
        uppercase: true,
        lowercase: false,
        number: false,
        symbol: false,
      });
      setLength(8);
    } else if (event.target.value === "basic") {
      setCheckState({
        uppercase: true,
        lowercase: true,
        number: false,
        symbol: false,
      });
      setLength(16);
    } else if (event.target.value === "strong") {
      setCheckState({
        uppercase: true,
        lowercase: true,
        number: true,
        symbol: true,
      });
      setLength(22);
    }
  }
  useEffect(() => {
    if (passState.custom) {
      tabPos.current.style.setProperty("--tab-bg-pos", "0%");
    } else if (passState.basic) {
      tabPos.current.style.setProperty("--tab-bg-pos", `${100 - 33 - 33}%`);
    } else if (passState.strong) {
      tabPos.current.style.setProperty("--tab-bg-pos", `${100 - 33}%`);
    }
  }, [passState]);

  return (
    <div className="pass-state" ref={tabPos}>
      <PassInput
        hanldeChange={hanldeChange}
        id="radio-state-1"
        value="custom"
        isChecked={passState.custom}
      />

      <PassInput
        hanldeChange={hanldeChange}
        id="radio-state-2"
        value="basic"
        isChecked={passState.basic}
      />
      <PassInput
        hanldeChange={hanldeChange}
        id="radio-state-3"
        value="strong"
        isChecked={passState.strong}
      />
      <div className="label-group">
        <label htmlFor="radio-state-1" className="label">
          custom
        </label>
        <label htmlFor="radio-state-2" className="label">
          basic
        </label>
        <label htmlFor="radio-state-3" className="label">
          strong
        </label>
      </div>
    </div>
  );
}

export default PassState;
