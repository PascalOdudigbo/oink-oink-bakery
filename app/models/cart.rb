class Cart < ApplicationRecord
  belongs_to :customer
  has_many :line_items, dependent: :destroy
  has_one :order
end
