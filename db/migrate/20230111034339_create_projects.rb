class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :role
      t.string :title
      t.string :client
      t.string :production_company
      t.integer :category_id
      t.date :date
      t.string :agency

      t.timestamps
    end
  end
end
