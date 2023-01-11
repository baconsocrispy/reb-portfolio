class AddValidationsToProjectsCategories < ActiveRecord::Migration[7.0]
  def change
    change_column_null :projects, :role, false
    change_column_null :projects, :title, false
    change_column_null :projects, :date, false
    change_column_null :categories, :name, false
  end
end
