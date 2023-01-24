class AddSortOrderAndActiveStatusToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :sort_order, :integer, null: :false
    add_column :projects, :active_status, :boolean, null: :false

    add_index :projects, :sort_order, unique: true
  end
end
