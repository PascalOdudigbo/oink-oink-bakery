class CreateVariantOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :variant_options do |t|
      t.references :variant_group, null: false, foreign_key: true
      t.string :name
      t.float :price

      t.timestamps
    end
  end
end
