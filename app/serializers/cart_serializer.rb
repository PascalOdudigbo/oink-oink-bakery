class CartSerializer < ActiveModel::Serializer
  attributes :id, :total, :active
  has_one :customer
  has_many :line_items
end
