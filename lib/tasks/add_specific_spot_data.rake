desc "新增特定景點資料"

task :add_specific_spot_data => :environment do
    
      @spot = Spot.new(name: "台北101觀景台",
                       address: "台北市信義路五段7號",
                       phone: "02 8101 8898",
                       city: "台北市",
                       description: "台北101觀景台是全台灣最高的觀景台，在388 公尺的高空俯瞰整個台北市，高度不僅是象山的兩倍多，更是唯一可以眺望基隆河谷景觀的景點。",
                       hour: 
                       "
                       星期一: 休息
                       星期二: 11:00 - 19:00
                       星期三: 11:00 - 19:00
                       星期四: 11:00 - 19:00
                       星期五: 11:00 - 19:00
                       星期六: 10:00 - 19:00
                       星期日: 10:00 - 19:00
                       ",
                       latitude: 25.0336752,
                       longitude: 121.5648831)

      @spot.save

    
end