import React from "react";
import { resolve, reject } from "q";

const PromiseAny = () => {
  const promiseAny = promisesArray => {
    const promisesError = new Array(promisesArray.length);
    let counter = 0;

    return new Promise((resolve, reject) => {
      promisesArray.forEach(promise => {
        promise
          .then(value => {
            resolve(value);
          })
          .catch(error => {
            promisesError[counter] = error;
            counter = counter + 1;
            if (counter === promisesArray.length) {
              // all promises rejected, reject outer promise
              reject(promisesError);
            }
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
    setTimeout(reject, 200, "three");
  });

  const reject1 = new Promise(function(resolve, reject) {
    setTimeout(reject, 500, "one");
  });
  const reject2 = new Promise(function(resolve, reject) {
    setTimeout(reject, 600, "two");
  });
  const reject3 = new Promise(function(resolve, reject) {
    setTimeout(reject, 200, "three");
  });

  const taskList = [];
  taskList.push(test1);
  taskList.push(test2);
  taskList.push(test3);

  const rejectList = [];
  rejectList.push(reject1);
  rejectList.push(reject2);
  rejectList.push(reject3);

  const callingPromise = () => {
    promiseAny(rejectList)
      .then(function(value) {
        // first and third fails, 2nd resolves
        console.log(value);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return <div>{callingPromise()}</div>;
};

export default PromiseAny;
