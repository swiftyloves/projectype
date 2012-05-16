class InviteMailer < ActionMailer::Base
  default from: "japie@example.com"

  def invite_mail(url)
    @url = url
    puts url
    mail(:to => url, :subject => 'Invite mail!!')
  end
end
