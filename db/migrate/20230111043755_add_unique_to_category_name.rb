class AddUniqueToCategoryName < ActiveRecord::Migration[7.0]
  def change
    remove_index :categories,  name: "index_categories_on_name"
    add_index :categories, :name, unique: true
  end
end
