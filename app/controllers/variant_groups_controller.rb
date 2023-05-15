class VariantGroupsController < ApplicationController
  before_action :set_variant_group, only: [:show, :update, :destroy]

  # GET /variant_groups
  def index
    @variant_groups = VariantGroup.all

    render json: @variant_groups
  end

  # GET /variant_groups/1
  def show
    render json: @variant_group
  end

  # POST /variant_groups
  def create
    @variant_group = VariantGroup.new(variant_group_params)

    if @variant_group.save
      render json: @variant_group, status: :created, location: @variant_group
    else
      render json: @variant_group.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /variant_groups/1
  def update
    if @variant_group.update(variant_group_params)
      render json: @variant_group
    else
      render json: @variant_group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /variant_groups/1
  def destroy
    @variant_group.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_variant_group
      @variant_group = VariantGroup.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def variant_group_params
      params.permit(:name)
    end
end
