class ContactController < ApplicationController
  def create
    email = params[:email]
    message = params[:message]

    ContactMailer.send_email(email, message).deliver_later
    render json: { success: true }
  end
end
