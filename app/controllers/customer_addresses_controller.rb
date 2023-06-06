class CustomerAddressesController < ApplicationController
  before_action :set_customer_address, only: [:show, :update, :destroy]

  # GET /customer_addresses
  def index
    @customer_addresses = CustomerAddress.all

    render json: @customer_addresses
  end

  # GET /customer_addresses/1
  def show
    render json: @customer_address
  end

  # POST /customer_addresses
  def create
    @customer_address = CustomerAddress.new(customer_address_params)

    if @customer_address.save
      render json: @customer_address, status: :created, location: @customer_address
    else
      render json: @customer_address.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /customer_addresses/1
  def update
    if @customer_address.update(customer_address_params)
      render json: @customer_address
    else
      render json: @customer_address.errors, status: :unprocessable_entity
    end
  end

  # DELETE /customer_addresses/1
  def destroy
    @customer_address.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer_address
      @customer_address = CustomerAddress.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def customer_address_params
      params.permit(:customer_id, :phone, :address, :aditional_information, :region, :city)
    end
end
