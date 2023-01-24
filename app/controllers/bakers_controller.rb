class BakersController < ApplicationController
  before_action :set_baker, only: [:show, :update, :destroy]

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
      params.require(:baker).permit(:first_name, :last_name, :email, :password_digest)
    end
end
