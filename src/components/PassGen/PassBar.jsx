import { FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';
import copy from "copy-to-clipboard";
import { useContext, useState } from "react";
import { PassContext } from "./context/PassContext";

function PassBar() {
  const [showPass, setShowPass] = useState(false);
  const { pass } = useContext(PassContext);

  function handleCopy() {
    copy(pass);
  }

  return (
    <div className="pass-bar">
      <input
        type={showPass ? "text" : "password"}
        value={pass}
        readOnly
        className="pass-input"
      />
      <div className="pass-bar-btn">
        <button onClick={() => setShowPass(!showPass)} className="btn">
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </button>
        <button onClick={handleCopy} className="btn">
          <FaCopy />
        </button>
      </div>
    </div>
  );
}

export default PassBar;
