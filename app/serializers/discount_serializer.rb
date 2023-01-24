class DiscountSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :discount_percent
end
