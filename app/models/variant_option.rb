class VariantOption < ApplicationRecord
  belongs_to :variant_group
  has_many :line_items
end
