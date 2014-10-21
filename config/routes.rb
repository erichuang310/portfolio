Rails.application.routes.draw do
  root 'home#index'

  get '/home/index'
  get '/home/resume', to: "home#download_resume", as: "download_resume"
  resources :messages, only: [:create]
end
