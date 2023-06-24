class Payment < ApplicationRecord
  attr_accessor :credit_card_number, :credit_card_exp_month, :credit_card_exp_year, :credit_card_cvv, :billing_city, :billing_line1, :billing_region, :billing_postal_code, :billing_name, :billing_email
  belongs_to :order

  before_validation :create_on_stripe

  def create_on_stripe
    token = get_token
    customer = Customer.find(order.cart.customer.id)
    stripe_customer_id = customer.stripe_customer.stripe_customer_id
    description = "Thank you #{customer.first_name} #{customer.last_name} for shopping at Oink Oink, the home of flavour. Your order is being processed and you'll be updated on the progress. Your order details are available on your Oink Oink Account."
    params = { 
      amount: order.cart.total.to_i * 100, 
      currency: 'kes', 
      description: description,
      receipt_email: customer.email,
      billing_details: {
        address: {
          city: billing_city,
          country: 'ke',
          line1: billing_line1,
          region: billing_region,
          postal_code: billing_postal_code
        },
        name: billing_name,
        email: billing_email, 
      } 
      source: token
    }
    response = Stripe::Charge.create(params)
    self.payment_stripe_id = response.id
  end

  def get_token
    Stripe::Token.create({
      card: {
        number: credit_card_number,
        exp_month: credit_card_exp_month,
        exp_year: credit_card_exp_year,
        cvc: credit_card_cvv,
      }
    })
  end
end
