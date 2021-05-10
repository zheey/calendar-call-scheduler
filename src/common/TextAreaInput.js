import React from "react";

const TextAreaInput = ({
  value = "",
  onHandleEventChange,
  label,
  isRequired
}) => {
  return (
    <div className="text-wrapper">
      <label>
        {label}
        <textarea
          required={isRequired}
          type="text"
          name="comment"
          value={value}
          onChange={onHandleEventChange}
        />
      </label>
    </div>
  );
};

export default TextAreaInput;
