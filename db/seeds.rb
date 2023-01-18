# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'

def create_or_update_projects
  Project.destroy_all

  # read and parse data from projects csv file 
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'reb_portfolio_projects.csv'))
  csv = CSV.parse(csv_text, :headers => true)

  # iterate through each project in the csv and 
  # create or update records as needed
  csv.each do |row|
    p row
    project = Project.where(:title => row['title'])

    if !project.empty?
      project.update!(
        role: row[0],
        title: row['title'],
        client: row['client'],
        production_company: row['production_company'],
        date: row['date'],
        agency: row['agency'],
        project_url: row['project_url'],
        thumbnail_url: row['thumbnail_url']
      )
    
    else
      Project.create!(
        role: row[0],
        title: row['title'],
        client: row['client'],
        production_company: row['production_company'],
        date: row['date'],
        agency: row['agency'],
        project_url: row['project_url'],
        thumbnail_url: row['thumbnail_url']
      )
    end
  end
end

create_or_update_projects
