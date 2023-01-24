require "rails_helper"

RSpec.describe ProductImagesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/product_images").to route_to("product_images#index")
    end

    it "routes to #show" do
      expect(get: "/product_images/1").to route_to("product_images#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/product_images").to route_to("product_images#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/product_images/1").to route_to("product_images#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/product_images/1").to route_to("product_images#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/product_images/1").to route_to("product_images#destroy", id: "1")
    end
  end
end
