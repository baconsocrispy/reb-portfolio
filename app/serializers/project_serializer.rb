class ProjectSerializer
  include JSONAPI::Serializer

  set_type :project
  set_id :id
  attributes :id, :role, :title, :production_company, :project_url, :thumbnail_url, :client, :date, :agency

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end