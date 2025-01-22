import { useContext } from "react";
import PassContext from "./context/PassContext";
function CheckList({ checked, hanldeChange, name }) {
  return (
    <li className="checklist">
      <label htmlFor={name} className="label">
        {name}
      </label>
      <span className="checkbox">
        <input
          onChange={hanldeChange}
          name={name}
          type="checkbox"
          id={name}
          className="check"
          checked={checked}
        />
        <svg className="check-btn-svg" viewBox="0 0 68 28">
          <rect className="check-path" x="14" y="4" rx="10" />
          <circle className="circle" cx="14" cy="14" r="14" />
        </svg>
      </span>
    </li>
  );
}

function CheckBoxes() {
  const { checkState, setCheckState, setPassState } = useContext(PassContext);
  function hanldeChange(event) {
    setCheckState({
      ...checkState,
      [event.target.name]: !checkState[event.target.name],
    });
    setPassState({
      custom: true,
      basic: false,
      strong: false,
    });
  }
  return (
    <ul className="checkboxes">
      <CheckList
        name="uppercase"
        hanldeChange={hanldeChange}
        checked={checkState.uppercase}
      />
      <CheckList
        name="lowercase"
        hanldeChange={hanldeChange}
        checked={checkState.lowercase}
      />
      <CheckList
        name="number"
        hanldeChange={hanldeChange}
        checked={checkState.number}
      />
      <CheckList
        name="symbol"
        hanldeChange={hanldeChange}
        checked={checkState.symbol}
      />
    </ul>
  );
}

export default CheckBoxes;
