class OrderSerializer < ActiveModel::Serializer
  attributes :id, :payment_method
  has_one :cart
end
