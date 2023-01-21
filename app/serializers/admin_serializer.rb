class AdminSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :username, :created_at
end
