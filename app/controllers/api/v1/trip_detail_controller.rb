class Api::V1::TripDetailController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'

  def show
    @trip = Trip.find(params[:trip_id])
  end

  def add
    @trip = Trip.find(params[:trip_id])
    @trip.update(length: @trip.length.to_i+1, end_date: @trip.end_date.to_date + 1.days)

    max_order = Schedule.where(trip_id: @trip.id).maximum(:day_order).to_i
    Schedule.create(trip_id: @trip.id, day_order: max_order + 1)

    render status: 200, json: ["Add schedule successfully"].to_json
  end

  def destroy
    @schedule = Schedule.find(params[:schedule_id])
    @trip = @schedule.trip

    if @trip.length > 1
      @trip.update(length: @trip.length.to_i-1, end_date: @trip.start_date.to_date + @trip.length.to_i.days - 2.days)
      @schedule.destroy

      render status: 200, json: ["Schedule deleted successfully"].to_json
    else
      respond_to do |format|
        format.json { render :json => ["第一天無法刪除，請增加天數或刪除整個行程"], status => 200 }
      end
    end
  end

  def update_name
    @trip = Trip.find_by(id: params[:trip_id])
    
    if @trip && params[:update_name] != ""
      @trip.update(name:params[:update_name])
      render status: 200, json: ["Name updated successfully"].to_json
    else
      render status: 404, json: ["update error"].to_json
    end
  end

  def update_order
    schedule_spots_ids = params[:schedule_spots_id]
    orders = params[:order_list]
    schedule_id = JSON.load(params[:schedule_id])
    length = schedule_spots_ids.length

    if schedule_spots_ids[0].is_a? Integer
      schedule_spot = ScheduleSpot.find(schedule_spots_ids[0])
      schedule_spot.update(order: orders[0])

    else schedule_spots_ids.count(schedule_spots_ids[2]) == 1
      schedule_spot_array = JSON.load(schedule_spots_ids[2])
      sspot_length = schedule_spot_array.length
      sspot_length.times do |x|
        schedule_spot = ScheduleSpot.find(schedule_spot_array[x])
        if schedule_spot.schedule_id == schedule_id
          schedule_spot.update(order: orders[2])
        end
      end
    end
    
    # else 
    #   schedule_spots_ids[3]
    #   repeat_array = schedule_spots_ids.map.with_index {|item, i| item == repeat ? i : nil}.compact

    # end

    # length.times do |i|
    #   if 
    #   end  
    
    # respond_to do |format|
    #   format.json { render :json => repeat }
    # end
  end
end