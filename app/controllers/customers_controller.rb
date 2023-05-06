class CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :update, :destroy]

  # POST /customer-login
  def login
    customer = Customer.find_by(params[:email])
    if customer&.authenticate(params[:password]) 
      session[:customer_id] = customer.id
      render json: customer, status: :created
    else
      render json: {error: "Invalid email or password"}, status: :unauthorized
    end
  end

  # GET /customer-logged-in
  def logged_in
    customer = Customer.find_by(id: session[:customer_id])
    render json: customer, status: :created
  end

  # DELETE /customer-logout
  def logout
    session.delete :customer_id
    head :no_content
  end

  # GET /customers
  def index
    @customers = Customer.all

    render json: @customers
  end

  # GET /customers/1
  def show
    render json: @customer
  end

  # POST /customers
  def create
    @customer = Customer.new(customer_params)

    if @customer.save
      render json: @customer, status: :created, location: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /customers/1
  def update
    if @customer.update(customer_params)
      render json: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /customers/1
  def destroy
    @customer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def customer_params
      params.permit(:first_name, :last_name, :email, :verified, :password, :password_confirmation)
    end
end
