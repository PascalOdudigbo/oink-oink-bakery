class VariantGroup < ApplicationRecord
  has_many :products
  has_many :variant_options, dependent: :destroy
end
