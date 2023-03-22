import React, { useState } from "react";
import Select from ".";

const SelectCalling = () => {
  const options = [
    { label: "First", value: "1" },
    { label: "Second", value: "2" },
    { label: "Third", value: "3" },
    { label: "Fourth", value: "4" },
    { label: "Fifth", value: "5" }
  ];
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState([]);
  const [allOptions, setAllOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const changedValue = val => {
    setValue1(val);
    if (val === undefined) {
      setFilteredOptions(allOptions);
    } else {
      let options = allOptions.filter(option => option.label !== val.label);
      setFilteredOptions(options);
    }
  };

  const changedValueMultiple = val => {
    setValue2(val);
    if (val === undefined) {
      setFilteredOptions(allOptions);
    } else {
      let options = [...val];
      const optionsToremove = new Set(options);
      let unselectedOptions = allOptions.filter(x => !optionsToremove.has(x));
      setFilteredOptions(unselectedOptions);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Select
        multiple
        options={filteredOptions}
        value={value2}
        onChange={o => changedValueMultiple(o)}
      />
      <br />
      <Select
        options={filteredOptions}
        value={value1}
        onChange={val => changedValue(val)}
      />
    </div>
  );
};

export default SelectCalling;
