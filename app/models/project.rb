class Project < ApplicationRecord
  has_and_belongs_to_many :categories

  validates :role, presence: true
  validates :title, presence: true
  validates :date, presence: true

  
end
