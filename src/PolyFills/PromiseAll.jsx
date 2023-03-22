import React from "react";
import { resolve, reject, Promise, promised } from "q";

const PromiseAll = () => {
  const myPromiseAll = taskList => {
    let noOfPromises = taskList.length;
    let completedPromises = 0;
    let results = [];
    return new Promise((resolve, reject) => {
      taskList.forEach((currPromise, index) => {
        currPromise
          .then(val => {
            results[index] = val;
            completedPromises++;
            if (completedPromises === noOfPromises) {
              resolve(results);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };

  function task(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(time);
      }, time);
    });
  }
  const taskList = [task(1000), task(5000), task(3000)];

  myPromiseAll(taskList)
    .then(results => {
      console.log("got results", results);
    })
    .catch(console.error);

  const callingPromise = () => {
    myPromiseAll(taskList);
  };

  return <div>{callingPromise()}</div>;
};

export default PromiseAll;
