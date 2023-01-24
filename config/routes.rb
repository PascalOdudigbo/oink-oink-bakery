Rails.application.routes.draw do
  
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
end
