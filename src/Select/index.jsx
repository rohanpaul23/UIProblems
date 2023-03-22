import React, { useState, useEffect } from "react";
import "./select.css";

type SelectOption = {
  value: string,
  label: any
};

type MultipleSelectProps = {
  multiple: true,
  value: SelectOption[],
  onChange: (value: SelectOption[]) => void
};

type SingleSelectProps = {
  multiple?: false,
  value?: SelectOption,
  onChange: (value: SelectOption | undefined) => void
};

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(1);

  useEffect(() => {
    if (showOptions) {
      setHighlightedIndex(0);
    }
  }, [showOptions]);

  const changeValue = option => {
    if (multiple) {
      onChange([...value, option]);
    } else {
      if (option !== value) onChange(option);
    }
  };

  const handleKeyDown = e => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (highlightedIndex === 0) {
        return;
      }
      setHighlightedIndex(highlightedIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (highlightedIndex - 1 === options.length) {
        return;
      }
      setHighlightedIndex(highlightedIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      changeValue(options[highlightedIndex]);
      setHighlightedIndex(0);
      setShowOptions(false);
    }
  };

  return (
    <div
      tabIndex={0}
      className="container"
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(showOptions => !showOptions)}
      onKeyDown={e => handleKeyDown(e)}
    >
      <div className="value">
        {" "}
        {multiple
          ? value?.map(v => (
              <button
                key={v.value}
                onClick={e => {
                  e.stopPropagation();
                }}
                className={"option-badge"}
              >
                {v.label}
                <span className={"remove-btn"}>&times;</span>
              </button>
            ))
          : value?.label}
      </div>
      <button
        className="clear-btn"
        onClick={e => {
          e.stopPropagation();
          onChange(undefined);
          setShowOptions(false);
        }}
      >
        &times;
      </button>
      <div className="divider"></div>
      <div className="caret"></div>
      <ul className={`options ${showOptions ? "show" : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`option ${
              index === highlightedIndex ? "highlighted" : ""
            }`}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={() => changeValue(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
