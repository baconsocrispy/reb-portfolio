class RemoveIndexFromProjectsSortOrder < ActiveRecord::Migration[7.0]
  def change
    remove_index :projects, :sort_order
  end
end
