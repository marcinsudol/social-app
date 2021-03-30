import "./content-input.scss";

import { useCallback, useEffect, useRef } from "react";

export default function ContentInput({ buttonLabel, rows, submit, setFocus }) {
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

  useEffect(() => {
    if (setFocus) {
      inputRef.current.focus();
    }
  }, [setFocus]);

  return (
    <form className="input-form" onSubmit={onSubmit}>
      <textarea rows={rows || "3"} ref={inputRef} />
      <button type="submit">{buttonLabel || "Submit"}</button>
    </form>
  );
}
