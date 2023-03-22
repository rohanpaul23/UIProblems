import React from "react";
import { reject, resolve } from "q";

const PromiseRace = () => {
  const promiseRace = promisesArray => {
    return new Promise((resolve, reject) => {
      promisesArray.forEach(promise => {
        promise
          .then(val => {
            resolve(val);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };

  const test1 = new Promise(function(resolve, reject) {
    setTimeout(reject, 500, "one");
  });
  const test2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 600, "two");
  });
  const test3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 200, "three");
  });

  const taskList = [];
  taskList.push(test1);
  taskList.push(test2);
  taskList.push(test3);

  const callingPromise = () => {
    promiseRace(taskList)
      .then(result => {
        console.log("Resolved" + result);
      })
      .catch(error => {
        console.log("Rejected" + error);
      });
  };

  return <div>{callingPromise()}</div>;
};

export default PromiseRace;
