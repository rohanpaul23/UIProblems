import React, { useState } from "react";

import "./autoComplete.css";
const AutoComplete = () => {
  const autoCompleteData = [
    "Asparagus",
    "Beetroot",
    "Broccoli",
    "Cabbage",
    "Carrot",
    "Cauliflower",
    "Celery",
    "Corn",
    "Eggplant",
    "Lettuce",
    "Mushroom",
    "Onion",
    "Parsnip",
    "Pea",
    "Potato",
    "Pumpkin",
    "Radish",
    "Spinach",
    "Tomato",
    "Turnip"
  ];

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const handleValueChange = searchedValue => {
    setValue(searchedValue);
    if (searchedValue === "") {
      setSuggestions([]);
    } else {
      let result = autoCompleteData.filter(item =>
        item.includes(searchedValue.toLowerCase())
      );
      console.log(result);
      setSuggestions(result);
    }
  };

  const handleKeyDown = e => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestions([]);
    }
  };
  const handleSelectSuggestion = e => {
    setSuggestions([]);
    setValue(e.target.innerText);
  };

  const SuggestionsList = ({ suggestionsList }) => {
    return (
      <div>
        {suggestionsList.map((suggestion, index) => {
          return (
            <div
              className={
                index === suggestionIndex
                  ? "suggestions-item active"
                  : "suggestions-item"
              }
              onClick={e => handleSelectSuggestion(e)}
            >
              {suggestion}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="text"
          onChange={e => handleValueChange(e.target.value)}
          value={value}
          onKeyDown={e => handleKeyDown(e)}
        />
      </div>

      <div className="suggestions">
        {suggestions.length !== 0 && (
          <SuggestionsList suggestionsList={suggestions} />
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
