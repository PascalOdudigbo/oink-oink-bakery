class CreateStripeCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :stripe_customers do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :stripe_customer_id

      t.timestamps
    end
  end
end
