Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :groups, except: [:index, :destroy]
  root "messages#index"
end
