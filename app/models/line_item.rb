class LineItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product
  belongs_to :variant_option
end
