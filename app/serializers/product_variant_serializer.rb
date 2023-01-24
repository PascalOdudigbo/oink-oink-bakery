class ProductVariantSerializer < ActiveModel::Serializer
  attributes :id, :size, :price
  has_one :product
end
