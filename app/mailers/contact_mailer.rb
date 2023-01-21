class ContactMailer < ApplicationMailer
  default from: 'rebecca@rebeccaeddybacon.com'

  def send_email(sender, email, message)
    @sender = sender
    @email = email
    @message = message

    mail(
      to: 'carterbacon.code@gmail.com', 
      subject: 'Portfolio Site | New Contact Form Submission'
    )
    render 'send_email'
  end
end
