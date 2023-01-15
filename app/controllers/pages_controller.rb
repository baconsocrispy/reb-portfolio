class PagesController < ApplicationController
  def home
    @projects = Project.all
    respond_to do |format|
      format.html
      format.json { render json: ProjectSerializer.new(@projects).serializable_hash.to_json }
    end
  end
end
