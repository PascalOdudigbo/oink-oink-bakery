class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :cart
  has_one :product
  has_one :variant_option
end
