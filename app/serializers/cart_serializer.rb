class CartSerializer < ActiveModel::Serializer
  attributes :id, :total, :active
  has_one :customer
end
