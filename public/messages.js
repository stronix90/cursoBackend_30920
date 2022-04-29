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
  };
  socket.emit("newMessage", newMessage);

  document.querySelector("#formMsg #message").value = "";
});

// RECEIVE AND DRAW MESSAGES
// getAll
socket.on("inicioMsg", (data) => {
  const messageUL = document.getElementById("messageUL");
  data.map((msg) => messageUL.appendChild(DOM_drawMessage(msg)));

  scrollDown();
});

// getNewOne
socket.on("newMessage", (data) => {
  const messageUL = document.getElementById("messageUL");
  messageUL.appendChild(DOM_drawMessage(data));

  scrollDown();
});

// Draw
const DOM_drawMessage = (msg) => {
  const email = document.querySelector("#formMsg #email").value;

  const DOM_msg = `
    <li
        class="m-2 liMessages ${email === msg.email && "liMessages_me"}">

        <div class="${
          email === msg.email
            ? "liMessages__msgContainer"
            : "liMessages_me__msgContainer"
        }">

            <p style="margin: 0; font-size:.7rem">${msg.email}</p>

            <span style="margin: .5rem 0;">${msg.msg}</span>

            <p style="margin: 0; font-size:.7rem">${moment(
              msg.created_at
            ).format("DD/MM/YYYY HH:mm:ss")}</p>

        </div>
    </li>`;

  return document.createRange().createContextualFragment(DOM_msg);
};

const scrollDown = () => {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.scrollTop = messageContainer.scrollHeight;
};
