
module Api
  module V1
    
    class VehiclesController < ApplicationController
      before_action :set_vehicle, only: %i[ show update destroy ]

      # GET /vehicles
      def index
        @vehicles = Vehicle.all

        render json: @vehicles
      end

      # GET /vehicles/1
      def show
        render json: @vehicle
      end

      # POST /vehicles
      def create
        @vehicle = Vehicle.new(vehicle_params)

        puts vehicle_params
        if @vehicle.save
          render json: @vehicle, status: :created
        else
          render json: @vehicle.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /vehicles/1
      def update
        # @state = State.where("id = ?", update_vehicle_params[:state_id])
        if @vehicle.update(update_vehicle_params)
          render json: @vehicle
        else
          render json: @vehicle.errors, status: :unprocessable_entity
        end
      end

      # DELETE /vehicles/1
      def destroy
        @vehicle.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_vehicle
          @vehicle = Vehicle.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def vehicle_params
          params.require(:vehicle).permit(:name, :state)
        end

        def update_vehicle_params
          params.require(:vehicle).permit(:state_id)
        end
    end

  end
end
