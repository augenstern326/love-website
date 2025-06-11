import { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import romanticBg from '../assets/romantic-background.png'
import heartDecoration from '../assets/heart-decoration.png'

const Home = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const startDate = new Date('2025-06-06T20:00:00')
    
    const updateTimer = () => {
      const now = new Date()
      const diff = now - startDate
      
      if (diff > 0) {
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeElapsed({ years, months, days, hours, minutes, seconds })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${romanticBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      {/* 浮动装饰元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        {/*<div className="absolute bottom-40 left-20 animate-bounce delay-1000">*/}
        {/*  <img src={heartDecoration} alt="heart" className="w-12 h-12 opacity-70" />*/}
        {/*</div>*/}
        <div className="absolute bottom-20 right-10 animate-pulse delay-500">
          <Sparkles className="w-8 h-8 text-pink-500" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-ping">
          <Heart className="w-4 h-4 text-red-400" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce delay-700">
          <Heart className="w-6 h-6 text-pink-300" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* 主标题 */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-4 responsive-title heartbeat-animation">
            我们在一起
          </h1>
          <div className="flex items-center justify-center space-x-2 text-pink-600">
            <Heart className="w-5 h-5 sparkle-animation" />
            <span className="text-sm font-medium">每一秒都是爱的见证</span>
            <Heart className="w-5 h-5 sparkle-animation" />
          </div>
        </div>

        {/* 计时器 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 mb-12 border border-pink-200 hover-lift fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {[
              { label: '年', value: timeElapsed.years, color: 'from-pink-500 to-rose-500' },
              { label: '月', value: timeElapsed.months, color: 'from-purple-500 to-pink-500' },
              { label: '天', value: timeElapsed.days, color: 'from-indigo-500 to-purple-500' },
              { label: '时', value: timeElapsed.hours, color: 'from-blue-500 to-indigo-500' },
              { label: '分', value: timeElapsed.minutes, color: 'from-cyan-500 to-blue-500' },
              { label: '秒', value: timeElapsed.seconds, color: 'from-teal-500 to-cyan-500' }
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`bg-gradient-to-br ${color} text-white rounded-xl md:rounded-2xl p-3 md:p-4 mb-2 shadow-lg transform hover:scale-105 transition-all duration-300 hover-lift`}>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-xs md:text-sm text-gray-700 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 爱情寄语 */}
        <div className="text-center fade-in-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 hover-lift">
            <div className="flex items-center justify-center mb-4">
              <img src={heartDecoration} alt="heart" className="w-10 h-10 md:w-12 md:h-12 float-animation" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              💕 爱的宣言 💕
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              时间见证着我们的爱情，每一分每一秒都在诉说着我们的故事。
              <br />
              愿我们的爱情如这计时器一样，永远向前，永不停歇。
              <br />
              <span className="text-pink-600 font-semibold">我爱你，直到时间的尽头 ❤️</span>
            </p>
            
            {/* 额外的浪漫元素 */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2 hover-lift">
                <span className="text-sm text-pink-700 font-medium">💖 Forever Love</span>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-4 py-2 hover-lift">
                <span className="text-sm text-purple-700 font-medium">🌟 Together Always</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

