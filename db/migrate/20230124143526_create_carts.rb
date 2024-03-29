class CreateCarts < ActiveRecord::Migration[6.1]
  def change
    create_table :carts do |t|
      t.references :customer, null: false, foreign_key: true
      t.float :total
      t.boolean :active

      t.timestamps
    end
  end
end
