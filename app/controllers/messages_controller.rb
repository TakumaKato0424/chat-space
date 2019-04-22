class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = ""
  private
  def set_group
    @group = Group.find(params[:group_id])
  end
end

