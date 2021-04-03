import "./content-input.scss";

import { useCallback, useEffect, useRef } from "react";

export default function ContentInput({
  buttonLabel,
  rows,
  submit,
  focusOnMount,
  focusOnRender,
  focusAfterSubmit,
  escapeKeyCallback,
}) {
  const inputRef = useRef();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newContent = inputRef.current.value.trim();
      if (newContent) {
        // create new message object
        submit(newContent);
        // clear input
        inputRef.current.value = "";
        // restore focus
        if (focusAfterSubmit) {
          inputRef.current.focus();
        }
      }
    },
    [submit, focusAfterSubmit]
  );

  const onKeyUp = useCallback(
    (e) => {
      e.preventDefault();
      if (escapeKeyCallback && e.target.value === "" && e.key === "Escape") {
        escapeKeyCallback();
      }
    },
    [escapeKeyCallback]
  );

  // focus on mount
  useEffect(() => {
    if (focusOnMount) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  // focus on render
  useEffect(() => {
    if (focusOnRender) {
      inputRef.current.focus();
    }
  });

  // clear when submit changes
  useEffect(() => {
    inputRef.current.value = "";
  }, [submit]);

  return (
    <form className="input-form" onSubmit={onSubmit}>
      {!isNaN(rows) ? (
        <textarea rows={rows} ref={inputRef} onKeyUp={onKeyUp} />
      ) : (
        <input ref={inputRef} onKeyUp={onKeyUp} />
      )}

      <button type="submit">{buttonLabel || "Submit"}</button>
    </form>
  );
}
