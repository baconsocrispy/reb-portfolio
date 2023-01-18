class ContactController < ApplicationController
  def create
    sender = params[:name]
    email = params[:email]
    message = params[:message]

    begin
      ContactMailer.send_email(sender, email, message).deliver_later
      render json: { success: true, message: 'Thanks for your message!' }
    rescue
      render json: { success: false, message: 'The message failed to send' }
    end
  end
end
