class Order < ApplicationRecord
  attr_accessor :credit_card_number, :credit_card_exp_month, :credit_card_exp_year, :credit_card_cvv, :billing_city, :billing_line1, :billing_region, :billing_postal_code, :billing_name, :billing_email
  
  belongs_to :cart
  has_one :payment, dependent: :destroy
  after_create :create_payment

  enum payment_method: %i[credit_card]
  def create_payment
    params = {
      order_id: id,
      credit_card_number: credit_card_number,
      credit_card_exp_month: credit_card_exp_month,
      credit_card_exp_year: credit_card_exp_year,
      credit_card_cvv: credit_card_cvv
      billing_city: billing_city, 
      billing_line1: billing_line1,
      billing_region: billing_region,
      billing_postal_code: billing_postal_code,
      billing_name: billing_name,
      billing_email: billing_email
    }
    Payment.create!(params)
  end
end
