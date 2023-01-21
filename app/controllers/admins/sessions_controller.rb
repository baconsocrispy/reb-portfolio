# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  respond_to :json  
  
  def get_admin
    # returns a serialized Admin object with current_admin attributes
    if (current_admin)
      render json: {
        status: {
          code: 200
        },
        data: AdminSerializer.new(current_admin).serializable_hash[:data][:attributes] 
      }, status: :ok
    else
      render json: { 
        message: 'No current admin',
      }
    end
  end

  private 
  def respond_with(resource, _opts = {})
    render json: {
      status: {
        code: 200,
        message: 'Admin logged in successfully.'
      },
      data: AdminSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_admin.nil?
      render json: {
        status: 200,
        message: 'Admin logged out successfully'
      }, status: :ok
    else
      render json: {
        status: 422,
        message: 'Something went wrong, session still active'
      }, status: :unprocessable_entity
    end
  end
end
