class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.string :description
      t.references :discount, null: true, foreign_key: true
      t.references :variant_group, null: true, foreign_key: true
      t.boolean :active

      t.timestamps
    end
  end
end
