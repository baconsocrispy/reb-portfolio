# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_11_182954) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "categories_projects", id: false, force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_categories_projects_on_category_id"
    t.index ["project_id"], name: "index_categories_projects_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "role", null: false
    t.string "title", null: false
    t.string "client"
    t.string "production_company"
    t.date "date", null: false
    t.string "agency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "project_url"
    t.string "thumbnail_url"
    t.index ["date"], name: "index_projects_on_date"
    t.index ["role"], name: "index_projects_on_role"
    t.index ["title"], name: "index_projects_on_title"
  end

end
