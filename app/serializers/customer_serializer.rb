class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :verified, :password_digest
  has_many :carts
  has_many :customer_addresses
  has_one :stripe_customer
  has_many :orders
end
