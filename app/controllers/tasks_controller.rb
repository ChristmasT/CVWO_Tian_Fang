class TasksController < ApplicationController
  def index
    json = Task.all.map do |task|
      {
	      id: task.id,
	      title: task.title,
	      description: task.description,
	      tags: task.tags,
	      completed: task.completed,
        due: task.due
      }
    end

    render json: json
  end

  def show
    task = Task.find(params[:id])
    render json: task_json(task)
  end

  def create
    task = Task.new(task_params)
    result = task.save
    render task_json(task), status: result ? 200 : 422
  end

  def update
    task = Task.find(params[:id])
    task.attributes = task_params
    result = task.save
    render task_json(task), status: result ? 200 :422
  end

  def destroy
    task= Task.find(params[:id])
    task.destroy
    render json: { result: :ok }
  end

  private
    def task_json(task)
      {
	id: task.id,
	title: task.title,
	description: task.description,
	tags: task.tags,
	completed: task.completed,
	due: task.due,
	errors: task.errors
      }
    end

    def task_params
      params.require(:task).permit(:title, :description, :tags, :completed, :due)
    end
end
