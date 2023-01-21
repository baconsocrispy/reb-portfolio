# frozen_string_literal: true

class Admins::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  # need to explicitly tell the controllers to respond with json 
  # formatted per the below
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {
          code: 200,
          message: 'Signup Success'
        },
        data: AdminSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {
          message: "#{ 
            resource.errors.full_messages.to_sentence
          }",
          errors: resource.errors
        }
      }, status: :unprocessable_entity
    end
  end

  # needed to create custom params to allow username to be permitted
  # 'sign_up_params' is how Devise sends params to create method
  def sign_up_params
    params.require(:admin).permit(:email, :username, :password, :password_confirmation)
  end
end
