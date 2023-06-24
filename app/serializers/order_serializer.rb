class OrderSerializer < ActiveModel::Serializer
  attributes :id, :payment_method
  has_one :cart
  has_one :payment
end
