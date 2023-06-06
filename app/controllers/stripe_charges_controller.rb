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
                name: params[:customer_fullname],
                phone: params[:customer_phone], 

                address: {
                    city: ,
                    country: ,
                    line1: ,
                    region: ,

                },
            }  
        )

        puts payment_intent
        render json: {
            clientSecret: payment_intent["client_secret"],
        }

    end

end