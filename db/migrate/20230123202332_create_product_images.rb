class CreateProductImages < ActiveRecord::Migration[6.1]
  def change
    create_table :product_images do |t|
      t.references :product, null: false, foreign_key: true
      t.string :image_url
      t.string :image_public_id

      t.timestamps
    end
  end
end
