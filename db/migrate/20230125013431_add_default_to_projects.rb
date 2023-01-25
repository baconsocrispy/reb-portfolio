class AddDefaultToProjects < ActiveRecord::Migration[7.0]
  def change
    change_column :projects, :active_status, :boolean, default: :true
  end
end
