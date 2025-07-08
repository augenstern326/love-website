import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, RefreshCw, ImageIcon } from 'lucide-react'
import romanticBg from '../../assets/romantic-background.png'

const NekoPage = () => {
  const [catImage, setCatImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // 获取随机猫咪图片
  const fetchCatImage = async () => {
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1')
      const data = await response.json()

      if (data && data.length > 0) {
        setCatImage(data[0])
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('获取猫咪图片失败:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  // 页面加载时获取第一张图片
  useEffect(() => {
    fetchCatImage()
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
      <motion.div
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 浮动装饰元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-8 h-8 text-pink-400/60" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-6 h-6 text-purple-400/60" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-7 h-7 text-pink-500/50" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-8 h-8 text-purple-500/50" />
        </motion.div>
      </div>

      {/* 主内容 */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            可爱猫咪
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Heart className="w-5 h-5 text-pink-500" />
            <span>每一只猫咪都是天使</span>
            <Heart className="w-5 h-5 text-pink-500" />
          </motion.p>
        </motion.div>

        {/* 猫咪图片卡片 */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-pink-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="aspect-square max-w-lg mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
            {/* 加载状态 */}
            {loading && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-12 h-12 text-pink-400 mb-4" />
                </motion.div>
                <p className="text-pink-600 font-medium">正在获取可爱猫咪...</p>
              </motion.div>
            )}

            {/* 错误状态 */}
            {error && !loading && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ImageIcon className="w-12 h-12 text-pink-400 mb-4" />
                <p className="text-pink-600 font-medium mb-2">图片加载失败</p>
                <p className="text-sm text-gray-500">请点击刷新按钮重试</p>
              </motion.div>
            )}

            {/* 猫咪图片 */}
            {catImage && !loading && !error && (
              <motion.img
                src={catImage.url}
                alt="可爱的猫咪"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onError={() => setError(true)}
              />
            )}

            {/* 图片信息覆盖层 */}
            {catImage && !loading && !error && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-white text-sm">
                  <p>尺寸: {catImage.width} × {catImage.height}</p>
                  <p className="text-xs text-white/80 mt-1">ID: {catImage.id}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* 刷新按钮 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            onClick={fetchCatImage}
            disabled={loading}
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
            whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              <RefreshCw className="w-6 h-6" />
            </motion.div>
            <span>{loading ? '获取中...' : '换一只猫咪'}</span>
          </motion.button>
        </motion.div>

        {/* 温馨提示 */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4 mx-4 max-w-md mx-auto">
            <p className="text-gray-600 text-sm flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>图片来源于 The Cat API</span>
              <Heart className="w-4 h-4 text-pink-500" />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NekoPage