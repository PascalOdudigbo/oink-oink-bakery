class Product < ApplicationRecord
  belongs_to :discount
  has_many :product_images, dependent: :destroy
  has_many :reviews
  has_many :line_items
  has_one: variant_group
end
