class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ update destroy ]
  respond_to :json

  # GET /projects or /projects.json
  def index
    @projects = Project.by_sort_order
    respond_to do |format|
      format.json { render json: ProjectSerializer.new(@projects).serializable_hash.to_json }
    end
  end

  # POST /projects or /projects.json
  def create
    @project = Project.new(project_params)
    @project.save ? 
      create_success_response(@project) :
      create_failure_response(@project)
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    @project.update(project_params) ?
      update_success_response(@project) :
      update_failure_response(@project)
  end

  # PATCH /projects route to update sort order
  def update_projects
    # [reroute to update_projects_sort_order???]
    @projects = Project.all
    @projects.update_sort_order(update_sort_order_params)
    respond_to do |format|
      format.json { render json: ProjectSerializer.new(@projects).serializable_hash.to_json }
    end
  end

  # PATCH /projects/:id/update_active_status
  def update_active_status
    # [Stronger params here???]
    @project = Project.find(params[:id])
    active_status = @project.active_status
    @project.update!(active_status: !active_status)
    respond_to do |format|
      format.json { render json: ProjectSerializer.new(@project).serializable_hash[:data][:attributes][:active_status] }
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.destroy
    return delete_success_response(@project)
  end

  private
    # PARAMS
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:role, :title, :project_url, :client, :production_company, :agency, :thumbnail_url, :date)
    end

    def update_sort_order_params
      params.require(:projectIds)
    end

    # FORMATTED RESPONSE MESSAGES
    def create_success_response(project)
      render json: {
        status: {
          code: 200,
          message: 'Project created successfully'
        },
        data: ProjectSerializer.new(project).serializable_hash
      }, status: :ok
    end
    def create_failure_response(project)
      render json: {
        status: {
          code: 422,
          message: 'Failed to create new project',
          errors: project.errors
        }
      }, status: :unprocessable_entity
    end
    def update_success_response(project)
      render json: {
        status: {
          code: 200,
          message: 'Project updated successfully'
        },
        data: ProjectSerializer.new(project).serializable_hash
      }, status: :ok
    end
    def update_failure_response(project)
      render json: {
        status: {
          code: 422,
          message: 'Failed to update project',
          errors: project.errors
        }
      }, status: :unprocessable_entity
    end
    def delete_success_response(project)
      render json: {
        status: {
          code: 200,
          message: 'Project deleted successfully'
        }
      }
    end
end
