class VariantOptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :price
  has_one :variant_group
end
