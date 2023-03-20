class Product < ApplicationRecord
  belongs_to :discount
  belongs_to :variant_group
  has_many :product_images, dependent: :destroy
  has_many :reviews
  has_many :line_items
end
