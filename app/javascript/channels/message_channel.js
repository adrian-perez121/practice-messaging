import consumer from "channels/consumer"

const messageChannel = consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const messageDisplay = document.querySelector('#message-display')
    messageDisplay.insertAdjacentHTML('beforeend', this.template(data))
  },

  template(data) {
    return `<article class="message">
              <div class="message-header">
                <p>${data.user.email}</p>
              </div>
              <div class="message-body">
                <p>${data.message.body}</p>
              </div>
            </article>`
  }
});

// This isn't apart of the creation so it goes outside

document.addEventListener("turbo:load", () => {
  let form = document.querySelector('#message-form')
  if (form) {
    form.addEventListener('submit', (e) => {
      let messageInput = document.querySelector('#message-input').value
      if (messageInput == '') return;
      const message = {
        body: messageInput // We store the message...
      }

      messageChannel.send({message: message}) // ...and then we send it off
    })
  }
})


