Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  
  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
  end

  devise_scope :user do
    get "/auth/:provider/callback" => "authentications#create"
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "/auth/twitter/callback" => "authentications#github"
  # get "/auth/google/callback"  => "authentications#google"
  
end
