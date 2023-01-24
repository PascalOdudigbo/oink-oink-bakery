class ProductImageSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :image_public_id
  has_one :product
end
