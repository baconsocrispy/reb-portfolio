class ContactMailer < ApplicationMailer
  default from: 'rebecca@rebeccaeddybacon.com'

  def send_email(email, message) 
    @email = email
    @message = message
    mail(
      to: 'rebecca.m.eddy@gmail.com', 
      subject: 'Portfolio Site | New Contact Form Submission'
    )
    render 'send_email'
  end
end
