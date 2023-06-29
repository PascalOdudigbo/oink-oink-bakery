class OrderSerializer < ActiveModel::Serializer
  attributes :id, :payment_method, :status
  has_one :cart
  has_one :payment
  has_one :customer
  has_one :customer_address
end
