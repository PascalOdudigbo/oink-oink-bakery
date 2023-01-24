require "rails_helper"

RSpec.describe ProductVariantsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/product_variants").to route_to("product_variants#index")
    end

    it "routes to #show" do
      expect(get: "/product_variants/1").to route_to("product_variants#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/product_variants").to route_to("product_variants#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/product_variants/1").to route_to("product_variants#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/product_variants/1").to route_to("product_variants#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/product_variants/1").to route_to("product_variants#destroy", id: "1")
    end
  end
end
