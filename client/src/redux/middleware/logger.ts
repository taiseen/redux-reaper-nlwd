import { Middleware } from "@reduxjs/toolkit";

const logger: Middleware = (store) => (next) => (actions) => {
  console.log("Current state :", store.getState());
  console.log("Current Action :", actions);
  next(actions);
  console.log("Updated state :", store.getState());
};

export default logger;
