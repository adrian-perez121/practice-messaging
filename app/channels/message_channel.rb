class MessageChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'message'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Send the message right back to the subscribers of the broadcast
    data['user'] = current_user # So our js file knows who the user is
    ActionCable.server.broadcast('message', data)
  end
end
