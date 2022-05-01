import express from "express";

const loggingMiddleware = (
  request: express.Request,
  response: express.Response,
  next: Function
): void => {
  console.log(`
   ${"URL:"}           ${request.method + " " + request.url}
   ${"Headers:"}       ${JSON.stringify(request.headers)}
   ${"Query:"}         ${JSON.stringify(request.query)}
   ${"Body:"}          ${JSON.stringify(request.body)}
   `);
  next();
};

export default loggingMiddleware;
