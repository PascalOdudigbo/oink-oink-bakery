class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :active
  has_one :discount
  has_many :product_images
end
