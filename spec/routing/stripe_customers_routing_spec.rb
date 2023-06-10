require "rails_helper"

RSpec.describe StripeCustomersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/stripe_customers").to route_to("stripe_customers#index")
    end

    it "routes to #show" do
      expect(get: "/stripe_customers/1").to route_to("stripe_customers#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/stripe_customers").to route_to("stripe_customers#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/stripe_customers/1").to route_to("stripe_customers#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/stripe_customers/1").to route_to("stripe_customers#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/stripe_customers/1").to route_to("stripe_customers#destroy", id: "1")
    end
  end
end
