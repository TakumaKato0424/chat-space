class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    # 送られてきたIDから最新のIDまでを取得させる
    @messages = @group.messages.includes(:user).where("id > ?", params[:id])
    respond_to do |format|
      format.json
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
