class Customer < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :carts
    has_one :address

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true

end
