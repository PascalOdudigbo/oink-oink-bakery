class Customer < ApplicationRecord
    has_secure_password
    has_many :reviews, dependent: :destroy
    has_many :carts, dependent: :destroy
    has_many :orders, through: :carts, dependent: :destroy
    has_many :customer_addresses, dependent: :destroy
    has_one :stripe_customer, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true

end
