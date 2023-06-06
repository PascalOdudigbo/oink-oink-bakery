class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :color, :cake_text, :price
  has_one :cart
  has_one :product
  has_one :variant_option
end
