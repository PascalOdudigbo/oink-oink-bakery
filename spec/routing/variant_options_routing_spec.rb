require "rails_helper"

RSpec.describe VariantOptionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/variant_options").to route_to("variant_options#index")
    end

    it "routes to #show" do
      expect(get: "/variant_options/1").to route_to("variant_options#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/variant_options").to route_to("variant_options#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/variant_options/1").to route_to("variant_options#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/variant_options/1").to route_to("variant_options#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/variant_options/1").to route_to("variant_options#destroy", id: "1")
    end
  end
end
