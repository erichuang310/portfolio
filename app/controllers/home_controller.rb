class HomeController < ApplicationController
  def index
  end

  def download_resume
    send_file("#{Rails.root}/files/eric_huang_resume.pdf",
              filename: "eric_huang_resume.pdf",
              type: "application/pdf")
  end
end
