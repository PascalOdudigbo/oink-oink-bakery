Rails.application.routes.draw do
  
  resources :variant_options
  resources :variant_groups
  resources :line_items
  resources :carts
  resources :reviews
  resources :customers
  resources :product_variants
  resources :product_images
  resources :products
  resources :discounts
  resources :bakers
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


  #adding custom action routes for customers
  post "/customer-login", to: "customers#login"
  get "/customer-logged-in", to: "customers#logged_in"
  delete "/customer-logout", to: "customers#logout"
end
