class Admins::SessionsController < Devise::SessionsController
  respond_to :json
  # returns a serialized Admin object with current_admin attributes
  def get_admin
    if current_admin
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

  # overriding default devise create method
  def create
    # find admin by email
    @admin = Admin.find_by(email: sign_in_params[:email])
    return invalid_email_response unless @admin
    # verify password and login admin or return error response
    if @admin.valid_password?(sign_in_params[:password])
      sign_in :admin, @admin
      return sign_in_success_response(@admin)
    else
      return invalid_password_response
    end
  end

  private
  # PARAMS
  def sign_in_params
    params.require(:admin).permit :email, :password
  end

  # FORMATTED RESPONSE MESSAGES
  def invalid_email_response
    render json: {
      status: {
        code: 401,
        message: 'Invalid email or password',
        errors: 'Invalid email address'
      }
    }, status: :unauthorized
  end
  def invalid_password_response
    render json: {
      status: {
        code: 401,
        message: 'Invalid email or password',
        errors: 'Invalid password'
      }
    }, status: :unauthorized
  end
  def sign_in_success_response(admin)
    render json: {
      status: {
        code: 200,
        message: 'Admin logged in successfully'
      },
      data: AdminSerializer.new(admin).serializable_hash[:data][:attributes]
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
