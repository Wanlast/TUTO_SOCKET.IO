// io() connects to the socket.io sever at the url
const socket = io("http://localhost:5000");

// our socket has an:
// on method
// emit method

socket.on("welcome", (data) => {
  console.log(data);
  // once welcome is emitted from the server, we run this callback
  socket.emit("thankYou", [4, 5, 6]);
});
socket.on("newClient", (data) => {
  console.log("Message to all clients: a new socket has joined", data);
});

socket.on("messageFromServerToAllClients", (newMessage) => {
  document.getElementById("messages").innerHTML += `<li>${newMessage}</li>`;
});

document.getElementById("messages-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMessage = document.getElementById("user-message").value;
  document.getElementById("user-message").value = "";
  // this socket is sending an event to the server...
  socket.emit("messageFromClientToServer", newMessage);
});
