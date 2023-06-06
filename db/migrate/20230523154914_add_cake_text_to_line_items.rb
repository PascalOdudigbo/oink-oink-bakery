class AddCakeTextToLineItems < ActiveRecord::Migration[6.1]
  def change
    add_column :line_items, :cake_text, :string
  end
end
