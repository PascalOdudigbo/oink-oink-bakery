class VariantGroupSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :products
  has_many :variant_options
end
