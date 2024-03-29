class BakersController < ApplicationController
  before_action :set_baker, only: [:show, :update, :destroy]

  # POST /baker-login
  def login
    baker = Baker.find_by(params[:email])
    if baker&.authenticate(params[:password])
      session[:baker_id] = baker.id
      render json: baker, status: :created
    else 
      render json: {error: "Invalid email or password"}, status: :unauthorized
    end
  end

  # GET /baker-logged-in
  def logged_in
    baker = Baker.find_by(id: session[:baker_id])
    render json: baker, status: :created
  end

  # DELETE /baker-logout
  def logout
    session.delete :baker_id
    head :no_content
  end

  # POST /bakerer-account-recovery
  def account_recovery
    baker = Baker.find_by(email: params[:email])
    if baker != nil
      render json: baker, status: :accepted
    else
      render json: {error: "Email isn't linked to any account!"}, status: :unauthorized
    end
  
  end

  # GET /bakers
  def index
    @bakers = Baker.all

    render json: @bakers
  end

  # GET /bakers/1
  def show
    render json: @baker
  end

  # POST /bakers
  def create
    @baker = Baker.new(baker_params)

    if @baker.save
      render json: @baker, status: :created, location: @baker
    else
      render json: @baker.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bakers/1
  def update
    if @baker.update(baker_params)
      render json: @baker
    else
      render json: @baker.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bakers/1
  def destroy
    @baker.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_baker
      @baker = Baker.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def baker_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
