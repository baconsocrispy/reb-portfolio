class AddColumnProjectUrlToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :project_url, :string
  end
end
