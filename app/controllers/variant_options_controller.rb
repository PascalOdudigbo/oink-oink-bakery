class VariantOptionsController < ApplicationController
  before_action :set_variant_option, only: [:show, :update, :destroy]

  # GET /variant_options
  def index
    @variant_options = VariantOption.all

    render json: @variant_options
  end

  # GET /variant_options/1
  def show
    render json: @variant_option
  end

  # POST /variant_options
  def create
    @variant_option = VariantOption.new(variant_option_params)

    if @variant_option.save
      render json: @variant_option, status: :created, location: @variant_option
    else
      render json: @variant_option.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /variant_options/1
  def update
    if @variant_option.update(variant_option_params)
      render json: @variant_option
    else
      render json: @variant_option.errors, status: :unprocessable_entity
    end
  end

  # DELETE /variant_options/1
  def destroy
    @variant_option.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_variant_option
      @variant_option = VariantOption.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def variant_option_params
      params.require(:variant_option).permit(:variant_group_id, :name, :price)
    end
end
