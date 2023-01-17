class ContactMailer < ApplicationMailer
  default from: 'carterbacon.code@gmail.com'

  def send_email(email, message) 
    @email = email
    @message = message
    mail(
      to: 'carterbacon.code@gmail.com', 
      subject: 'Portfolio Site | New Contact Form Submission'
    )
    render 'send_email'
  end
end
