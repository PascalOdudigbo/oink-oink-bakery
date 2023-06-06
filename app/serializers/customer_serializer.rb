class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :verified, :password_digest
  has_many :carts
  has_one :address
end
