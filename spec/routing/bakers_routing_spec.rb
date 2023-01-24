require "rails_helper"

RSpec.describe BakersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/bakers").to route_to("bakers#index")
    end

    it "routes to #show" do
      expect(get: "/bakers/1").to route_to("bakers#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/bakers").to route_to("bakers#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/bakers/1").to route_to("bakers#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/bakers/1").to route_to("bakers#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/bakers/1").to route_to("bakers#destroy", id: "1")
    end
  end
end
