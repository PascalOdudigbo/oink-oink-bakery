class ProductImagesController < ApplicationController
  before_action :set_product_image, only: [:show, :update, :destroy]

  # GET /product_images
  def index
    @product_images = ProductImage.all

    render json: @product_images
  end

  # GET /product_images/1
  def show
    render json: @product_image
  end

  # POST /product_images
  def create
    @product_image = ProductImage.new(product_image_params)

    if @product_image.save
      render json: @product_image, status: :created, location: @product_image
    else
      render json: @product_image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /product_images/1
  def update
    if @product_image.update(product_image_params)
      render json: @product_image
    else
      render json: @product_image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /product_images/1
  def destroy
    @product_image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_image
      @product_image = ProductImage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_image_params
      params.permit(:product_id, :image_url, :image_public_id)
    end
end
