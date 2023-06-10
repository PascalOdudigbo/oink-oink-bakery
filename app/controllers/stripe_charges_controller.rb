require "stripe"

class StripeChargesController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        # setting the stripe API key
        Stripe.api_key = ENV['stripe_api_key']

        # creating the payment intent
        stripe_payment_intent = Stripe::PaymentIntent.create(
            amount: params[:amount],
            currency: 'kes', 
            automatic_payment_methods: {
                enabled: true,
            }, 
            receipt_email: params[:customer_email],
            shipping: {
                name: params[:fullname],
                phone: params[:phone], 

                address: {
                    city: params[:city],
                    country: 'ke',
                    line1: params[:address],
                    region: params[:region],

                },
            }  
        )

        puts payment_intent
        render json: {
            clientSecret: payment_intent["client_secret"],
        }

    end

end