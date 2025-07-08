import { useState, useEffect, useMemo, useCallback } from 'react'
import { Heart, Sparkles, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import romanticBg from '../../assets/romantic-background.png'
import heartDecoration from '../../assets/heart-decoration.png'

// 时间计算工具函数
const calculateTimeElapsed = (startDate) => {
  const now = new Date()
  const diff = now - startDate

  if (diff <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

  // 更精确的时间计算
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { years, months, days, hours, minutes, seconds }
}

// 浮动装饰组件
const FloatingDecorations = () => {
  const decorations = useMemo(() => [
    { id: 1, Icon: Heart, className: "top-20 left-10", size: "w-8 h-8", color: "text-pink-400", animation: "animate-bounce" },
    { id: 2, Icon: Sparkles, className: "top-40 right-20", size: "w-6 h-6", color: "text-purple-400", animation: "animate-pulse" },
    { id: 4, Icon: Heart, className: "top-1/2 left-1/4", size: "w-4 h-4", color: "text-red-400", animation: "animate-ping" },
    { id: 5, Icon: Heart, className: "top-1/3 right-1/3", size: "w-6 h-6", color: "text-pink-300", animation: "animate-bounce delay-700" },
   ], [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {decorations.map(({ id, Icon, className, size, color, animation }) => (
        <motion.div
          key={id}
          className={`absolute ${className} ${animation}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: id * 0.2, duration: 0.5 }}
        >
          <Icon className={`${size} ${color}`} />
        </motion.div>
      ))}
    </div>
  )
}

const Home = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // 恋爱开始时间 - 可以配置
  const startDate = useMemo(() => new Date('2025-06-06T20:00:00'), [])

  const updateTimer = useCallback(() => {
    setTimeElapsed(calculateTimeElapsed(startDate))
  }, [startDate])

  useEffect(() => {
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [updateTimer])

  // 时间单位配置
  const timeUnits = useMemo(() => [
    { label: '年', key: 'years', color: 'from-pink-500 to-rose-500', icon: Calendar },
    { label: '月', key: 'months', color: 'from-purple-500 to-pink-500', icon: Calendar },
    { label: '天', key: 'days', color: 'from-indigo-500 to-purple-500', icon: Calendar },
    { label: '时', key: 'hours', color: 'from-blue-500 to-indigo-500', icon: Clock },
    { label: '分', key: 'minutes', color: 'from-cyan-500 to-blue-500', icon: Clock },
    { label: '秒', key: 'seconds', color: 'from-teal-500 to-cyan-500', icon: Clock }
  ], [])

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
      <motion.div
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 浮动装饰元素 */}
      <FloatingDecorations />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* 主标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-4 responsive-title"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            我们在一起
          </motion.h1>
          <motion.div
            className="flex items-center justify-center space-x-2 text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-medium">每一秒都是爱的见证</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 计时器 */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 mb-12 border border-pink-200 hover-lift"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {timeUnits.map(({ label, key, color, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${color} text-white rounded-xl md:rounded-2xl p-3 md:p-4 mb-2 shadow-lg cursor-pointer`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="text-xl md:text-2xl lg:text-3xl font-bold"
                    key={timeElapsed[key]} // 重新渲染动画当数值改变时
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {timeElapsed[key].toString().padStart(2, '0')}
                  </motion.div>
                </motion.div>
                <div className="text-xs md:text-sm text-gray-700 font-medium">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* 总时长统计 */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="text-lg md:text-xl text-gray-700">
              我们已经相爱了
              <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24))}
              </motion.span>
              个美好的日子 ✨
            </div>
          </motion.div>
        </motion.div>

        {/* 爱情寄语 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 hover-lift relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
            </div>

            <motion.div
              className="flex items-center justify-center mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={heartDecoration} alt="heart" className="w-10 h-10 md:w-12 md:h-12" />
            </motion.div>

            <motion.h2
              className="text-xl md:text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              💕 爱的宣言 💕
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                我野蛮生长
                <br/>
                没能成为自己的月亮
                <br/>
                能遇见你 是银河赠送我的糖
              </p>
              <motion.p
                className="text-pink-600 font-semibold text-lg"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                TT我爱你，直到时间的尽头 ❤️
              </motion.p>
            </motion.div>

            {/* 额外的浪漫元素 */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm text-pink-700 font-medium">💖 Forever Love</span>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-4 py-2 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm text-purple-700 font-medium">🌟 Together Always</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home

