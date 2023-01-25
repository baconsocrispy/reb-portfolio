class Project < ApplicationRecord
  validates :role, presence: true
  validates :title, presence: true
  validates :date, presence: true

  scope :by_sort_order, -> { order(sort_order: :asc) }

  def self.update_sort_order(project_ids)
    project_ids.each_with_index do |project_id, index|
      project = self.find(project_id)
      project.update!(sort_order: index + 1)
    end
    return true
  end
end
