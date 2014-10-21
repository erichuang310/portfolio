class MessagesController < ApplicationController
	def create
		message = Message.new(message_params)
		if message.save
			render json: message 
		else
			render json: message.errors.full_messages, status: :unprocessable_entity
		end
	end

	private

	def message_params
		params.permit(:name, :email, :message)
	end
end
