class DiscountSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :discount_percent
  has_many :products
end
