class Product < ApplicationRecord
  belongs_to :discount
  has_many :product_images
  has_many :reviews
  has_many :product_variants
end
