class UsersController < ApplicationController

  def index
    keyword = params[:keyword]
    if keyword.empty?
      @users = User.all
    else
      @users = User.where('name LIKE(?)', "%#{keyword}%")
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email)
    end

end
