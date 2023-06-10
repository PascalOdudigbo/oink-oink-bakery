class StripeCustomersController < ApplicationController
  before_action :set_stripe_customer, only: [:show, :update, :destroy]

  # GET /stripe_customers
  def index
    @stripe_customers = StripeCustomer.all

    render json: @stripe_customers
  end

  # GET /stripe_customers/1
  def show
    render json: @stripe_customer
  end

  # POST /stripe_customers
  def create
    @stripe_customer = StripeCustomer.new(stripe_customer_params)

    if @stripe_customer.save
      render json: @stripe_customer, status: :created, location: @stripe_customer
    else
      render json: @stripe_customer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stripe_customers/1
  def update
    if @stripe_customer.update(stripe_customer_params)
      render json: @stripe_customer
    else
      render json: @stripe_customer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stripe_customers/1
  def destroy
    @stripe_customer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stripe_customer
      @stripe_customer = StripeCustomer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def stripe_customer_params
      params.permit(:customer_id, :stripe_customer_id)
    end
end
