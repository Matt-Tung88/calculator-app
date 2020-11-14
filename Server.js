const express = require("express");
const app = express();
const http = require("http").createServer(express);
const io = require("socket.io")(http);
const path = require("path");
const timeout = require('connect-timeout')

app.use(timeout('5s'))



//what port the web server to listen on
const port = process.env.PORT || 3000;


// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'build')));

//empty arrays: results = all the calculations for the new user to see and sockets = keep track of new/old socket.ids
const results = [];
const ids = [];


//console.logs various sentences based on connecting/disconnecting
io.on("connection", (socket) => {
  console.log("A user connected");


  //if a new user goes to the app, then send the results array to client side
  if (ids.includes(socket.id) === false) {
    io.to(socket.id).emit("new-user", results);
  } 

  ids.push(socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //move each output into results array at the beginning of the array and make sure the length doesnt go exceed 10
  socket.on("output", (result) => {
    results.unshift(result);

    if (results.length > 10) {
      results.pop();
    }
    //send result back to client so users can see other users' calculations
    io.emit("outputs", result);

  });
});

http.listen(port, () =>
  console.log(
    `Your app is running on https://calculator-mt.herokuapp.com/ on port: ${port}`
  )
);
