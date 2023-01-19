class Project < ApplicationRecord
  validates :role, presence: true
  validates :title, presence: true
  validates :date, presence: true
end
