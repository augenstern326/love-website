import { Calendar, Clock, BookOpen } from 'lucide-react'

const SchedulePage = () => {
  // 基于上传的课表图片数据
  const scheduleData = {
    title: "2024—2025学年度第二学期",
    timeSlots: [
      { period: "0", name:"早习",time: "7:15-7:40",type: "morning" },
      { period: "1", time: "8:35-9:15" },
      { period: "大课间", time: "9:15-9:45", type: "break", activity: "升旗仪式、早操" },
      { period: "2", time: "9:45-10:25" },
      { period: "3", time: "10:35-11:20" },
      { period: "4", time: "12:30-13:10" },
      { period: "5", time: "13:20-14:05" },
      { period: "大课间", time: "14:05-14:35", type: "break", activity: "转流看操" },
      { period: "6", time: "14:35-15:15" },
      { period: "7", time: "16:15-17:30"}
    ],
    weeklySchedule: {
      "星期一": { 3: "五3", 5: "五5", 6: "五1",7:"延时" },
      "星期二": { 5: "五5班队" },
      "星期三": { 2: "五4", 3: "五2", 4: "五5", 5: "五6" },
      "星期四": { 3: "五1", 6: "五6",7:"延时" },
      "星期五": { 0:"护学",3: "五3", 4: "五4", 6: "五2" }
    }
  }

  const weekDays = ["星期一", "星期二", "星期三", "星期四", "星期五"]

  const getCellContent = (day, periodIndex) => {
    const schedule = scheduleData.weeklySchedule[day]
    return schedule && schedule[periodIndex] ? schedule[periodIndex] : ""
  }

  const getCellColor = (content) => {
    if (!content) return "bg-gray-50"
    const colors = [
      "bg-pink-100 text-pink-800",
      "bg-purple-100 text-purple-800", 
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-yellow-100 text-yellow-800",
      "bg-indigo-100 text-indigo-800"
    ]
    const hash = content.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8 fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 mr-3 sparkle-animation" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              课程表
            </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600">{scheduleData.title}</p>
        </div>

        {/* 课表主体 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left font-semibold text-sm md:text-base">时间</th>
                  {weekDays.map(day => (
                    <th key={day} className="px-3 md:px-4 py-3 md:py-4 text-center font-semibold min-w-[100px] md:min-w-[120px] text-sm md:text-base">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.timeSlots.map((slot, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors`}>
                    <td className="px-3 md:px-4 py-3 md:py-4 border-r border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm md:text-base">
                            {slot.type === 'break' ? slot.period :(slot.type === 'morning'? slot.name : `第${slot.period}节`)}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">{slot.time}</div>
                          {slot.activity && (
                            <div className="text-xs text-blue-600 mt-1">{slot.activity}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const content = getCellContent(day, parseInt(slot.period))
                      const isBreak = slot.type === 'break'
                      
                      return (
                        <td key={day} className="px-3 md:px-4 py-3 md:py-4 text-center border-r border-gray-200">
                          {isBreak ? (
                            <div className="text-xs md:text-sm text-gray-500 italic">
                              {slot.activity}
                            </div>
                          ) : content ? (
                            <div className={`inline-flex items-center px-2 md:px-3 py-1 md:py-2 rounded-lg font-medium text-xs md:text-sm hover-lift ${getCellColor(content)}`}>
                              <BookOpen className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              {content}
                            </div>
                          ) : (
                            <div className="text-gray-400">-</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage

