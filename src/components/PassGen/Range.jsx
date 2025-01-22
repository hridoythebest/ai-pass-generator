import { useContext, useEffect, useRef } from "react";
import PassContext from "./context/PassContext";
function Range() {
  const { length, setLength } = useContext(PassContext);
  const trackWidth = useRef(null);
  function handleChange(event) {
    if (event.key === "Enter" || event.type === "blur") {
      length > 32 && setLength(32);
      length < 6 && setLength(6);
      return;
    }
    setLength(event.target.value);
  }
  useEffect(() => {
    let mainlength = length;
    length > 32 && (mainlength = 32);
    length < 6 && (mainlength = 6);
    const currentWidth = 100 / ((32 - 5) / (mainlength - 5));
    trackWidth.current.style.setProperty("--track-width", `${currentWidth}%`);
  }, [length]);
  return (
    <div className="range">
      <input
        ref={trackWidth}
        min="6"
        max="32"
        onChange={handleChange}
        value={length || 0}
        step="1"
        type="range"
        className="pass-range"
      />
      <input
        min="6"
        max="32"
        onChange={handleChange}
        onBlur={handleChange}
        onKeyDown={handleChange}
        value={length}
        type="number"
        className="pass-length"
      />
    </div>
  );
}

export default Range;
