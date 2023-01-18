class ContactController < ApplicationController
  def create
    sender = params[:name]
    email = params[:email]
    message = params[:message]

    begin
      ContactMailer.send_email(sender, email, message).deliver_now
      render json: { success: true, message: 'Thanks for your message!' }
    rescue Exception => e
      puts e
      render json: { success: false, message: 'There was a problem sending your message' }
    end
  end
end
