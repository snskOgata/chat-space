class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @group = Group.find(params[:group_id])
    @message = current_user.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
  end

  private
    def message_params
      params.require(:message).permit(:content, :image).merge(group_id: @group.id)
    end
end
