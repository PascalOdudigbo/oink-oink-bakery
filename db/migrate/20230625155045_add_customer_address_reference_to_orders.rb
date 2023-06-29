class AddCustomerAddressReferenceToOrders < ActiveRecord::Migration[6.1]
  def change 
    change_table :orders do |t|
      t.references :customer_address, null: false, foreign_key: true
    end
  end
end
