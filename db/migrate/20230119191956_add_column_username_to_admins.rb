class AddColumnUsernameToAdmins < ActiveRecord::Migration[7.0]
  def change
    add_column :admins, :username, :string, null: false
  end
end
