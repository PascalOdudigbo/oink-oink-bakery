class CustomerAddressSerializer < ActiveModel::Serializer
  attributes :id, :phone, :address, :aditional_information, :region, :city
  has_one :customer
  has_many :orders
end
