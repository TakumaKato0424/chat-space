class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = ""
  private

  def message_params
    params.require(:message).permit(:content, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

