class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :payment_stripe_id
  has_one :order
end
