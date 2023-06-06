class CreateCustomerAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :customer_addresses do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :phone
      t.string :address
      t.string :aditional_information
      t.string :region
      t.string :city

      t.timestamps
    end
  end
end
