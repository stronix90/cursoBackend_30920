const handleEmail = () => {
  socket.emit("getMessages");
  document.getElementById("email").disabled = true;
  document.getElementById("msgWarning").hidden = true;
};

// SEND MESSAGE
document.getElementById("formMsg").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMessage = {
    email: document.querySelector("#formMsg #email").value,
    msg: document.querySelector("#formMsg #message").value,
    datetime: new Date(),
  };
  socket.emit("newMessage", newMessage);
  document.querySelector("#formMsg #message").value = "";
});

// RECEIVE AND DRAW MESSAGES
// getAll
socket.on("inicioMsg", (data) => {
  const messageUL = document.getElementById("messageUL");
  data.map((msg) => messageUL.appendChild(DOM_drawMessage(msg)));
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

// getNewOne
socket.on("newMessage", (data) => {
  const messageContainer = document.getElementById("messageContainer");
  const messageUL = document.getElementById("messageUL");
  messageUL.appendChild(DOM_drawMessage(data));
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

// Draw
const DOM_drawMessage = (msg) => {
  const email = document.querySelector("#formMsg #email").value;

  const DOM_msg = `
    <li
        style="list-style: none;
            ${email === msg.email && "margin-left: auto!important"}"
        class="m-2">

        <div style="display: inline-flex; flex-direction: column;background: #f9bb2f;padding: .5rem 1rem;
            ${
              email === msg.email
                ? "border-radius: 1rem 0 1rem 1rem"
                : "border-radius: 0 1rem 1rem 1rem"
            }
        ">

            <p style="margin: 0; font-size:.7rem">${msg.email}</p>

            <span style="margin: .5rem 0;">${msg.msg}</span>

            <p style="margin: 0; font-size:.7rem">${moment(msg.datetime).format('DD/MM/YYYY HH:mm:ss')  }</p>

        </div>
    </li>`;

  return document.createRange().createContextualFragment(DOM_msg);
};
