import React from "react";
import { async } from "q";

const AsyncFunctionInSeries = () => {
  const asyncFunctionSeries = async promisesArray => {
    for (let promiseObject of promisesArray) {
      try {
        const result = await promiseObject;
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const asyncTask = function(i) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(`Completing ${i}`), 100 * i);
    });
  };
  const promises = [
    asyncTask(3),
    asyncTask(1),
    asyncTask(7),
    asyncTask(2),
    asyncTask(5)
  ];

  const callingMethod = () => {
    asyncFunctionSeries(promises);
  };

  return <div>{callingMethod()}</div>;
};

export default AsyncFunctionInSeries;
