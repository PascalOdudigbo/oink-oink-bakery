class StripeCustomerSerializer < ActiveModel::Serializer
  attributes :id, :stripe_customer_id
  has_one :customer
end
