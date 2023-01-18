class ContactMailer < ApplicationMailer
  default from: 'rebecca@rebeccaeddybacon.com'

  def send_email(sender, email, message)
    @sender = sender
    @email = email
    @message = message

    begin
      mail(
        to: 'carterbacon.code@gmail.com', 
        subject: 'Portfolio Site | New Contact Form Submission'
      )
      render 'send_email'
    rescue => error
      puts "Error sending email to #{ email }: #{ error.message }"
    end
  end
end
