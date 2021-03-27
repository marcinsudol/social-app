import "./content-input.scss";

import { useCallback, useRef } from "react";

export default function ContentInput({ buttonLabel, rows, submit }) {
  const inputRef = useRef();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newContent = inputRef.current.value.trim();
      if (newContent) {
        // create new message object
        submit(newContent);
        inputRef.current.value = "";
      }
    },
    [submit]
  );

  return (
    <form className="input-form" onSubmit={onSubmit}>
      <textarea rows={rows || "3"} ref={inputRef} />
      <button type="submit">{buttonLabel || "Submit"}</button>
    </form>
  );
}
