require "rails_helper"

RSpec.describe CustomerAddressesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/customer_addresses").to route_to("customer_addresses#index")
    end

    it "routes to #show" do
      expect(get: "/customer_addresses/1").to route_to("customer_addresses#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/customer_addresses").to route_to("customer_addresses#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/customer_addresses/1").to route_to("customer_addresses#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/customer_addresses/1").to route_to("customer_addresses#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/customer_addresses/1").to route_to("customer_addresses#destroy", id: "1")
    end
  end
end
