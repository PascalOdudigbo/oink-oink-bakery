class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :active
  has_one :discount
  has_one :variant_group
  has_many :product_images
  # has_many :variant_options, through: :variant_group
end
