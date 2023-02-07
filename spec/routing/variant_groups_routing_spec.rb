require "rails_helper"

RSpec.describe VariantGroupsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/variant_groups").to route_to("variant_groups#index")
    end

    it "routes to #show" do
      expect(get: "/variant_groups/1").to route_to("variant_groups#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/variant_groups").to route_to("variant_groups#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/variant_groups/1").to route_to("variant_groups#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/variant_groups/1").to route_to("variant_groups#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/variant_groups/1").to route_to("variant_groups#destroy", id: "1")
    end
  end
end
