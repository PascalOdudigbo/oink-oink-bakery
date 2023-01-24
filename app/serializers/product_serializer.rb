class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :active
  has_one :discount
end
