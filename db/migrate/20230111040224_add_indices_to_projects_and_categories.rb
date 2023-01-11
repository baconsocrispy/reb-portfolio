class AddIndicesToProjectsAndCategories < ActiveRecord::Migration[7.0]
  def change
    add_index :projects, :role
    add_index :projects, :title
    add_index :projects, :date
    add_index :categories, :name
  end
end
