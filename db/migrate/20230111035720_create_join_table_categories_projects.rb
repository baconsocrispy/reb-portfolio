class CreateJoinTableCategoriesProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :categories_projects, id: false  do |t|
      t.belongs_to :category
      t.belongs_to :project

      t.timestamps
    end

    remove_column :projects, :category_id
  end
end
