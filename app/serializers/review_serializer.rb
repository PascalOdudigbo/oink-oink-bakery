class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review
  has_one :product
  has_one :customer
end
