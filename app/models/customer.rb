class Customer < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :carts
    has_many :customer_addresses

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true

end
