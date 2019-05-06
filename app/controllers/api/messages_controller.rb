class Api::MessagesController < ApplicationController
  def index
    # 送られてきたIDから最新のIDまでを取得させる
    @messages = @group.messages.includes(:user).where("id > ?", params[:id])
  end
end
