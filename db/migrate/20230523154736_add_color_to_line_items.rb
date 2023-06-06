class AddColorToLineItems < ActiveRecord::Migration[6.1]
  def change
    add_column :line_items, :color, :string
  end
end
