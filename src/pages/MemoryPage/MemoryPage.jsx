import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Heart,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Calendar,
    Camera,
    ImageIcon,
    Gift,
    CalendarHeart, Cloud
} from 'lucide-react'
import romanticBg from '../../assets/romantic-background.png'

// 图片预加载 Hook
const useImagePreloader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [failedImages, setFailedImages] = useState(new Set())

  useEffect(() => {
    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]))
          resolve(true)
        }
        img.onerror = () => {
          setFailedImages(prev => new Set([...prev, url]))
          resolve(false)
        }
        img.src = url
      })
    }

    const allImages = imageUrls.flat()
    allImages.forEach(loadImage)
  }, [imageUrls])

  return { loadedImages, failedImages }
}

const MemoryPage = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [showForm, setShowForm] = useState(false)
    const [memories, setMemories] = useState([
        {
            id: 1,
            title: "告白の日",
            date: "2025-06-06",
            location: "中央公园",
            description: "小番茄趣事、茶颜悦色、马记永、狼狈表白",
            category: "特别日子",
            images: ["img/20250606.jpg"] // 支持多张图片
        },
        {
            id: 2,
            title: "第一次约会",
            date: "2025-06-10",
            location: "狮山公园",
            description: "三千粉米线、牵手、依依不舍",
            category: "约会",
            images: ["img/20250610.jpg"]
        },
        {
            id: 3,
            title: "公园散步",
            date: "2025-06-13",
            location: "石湖公园",
            description: "重庆小面、RIO、萤火虫",
            category: "约会",
            images: ["img/20250613.jpg"]
        },
        {
            id: 4,
            title: "平姐生日",
            date: "2025-06-21",
            location: "胥江龙湖",
            description: "黔夺夺、KTV、山姆超市、鑫花溪、台球",
            category: "约会",
            images: ["img/20250621.jpg"]
        },
        {
            id: 5,
            title: "宅家看电影",
            date: "2025-06-22",
            location: "家",
            description: "紫燕百味鸡、《夏洛特烦恼》",
            category: "日常",
            images: ["img/20250622.jpg"]
        },
        {
            id: 6,
            title: "周六小逛",
            date: "2025-07-19",
            location: "苏州中心",
            description: "蛙喔牛蛙、音乐喷泉、KKV、抓娃娃",
            category: "约会",
            images: ["img/20250719-1.jpg","img/20250719-2.jpg"]
        }
    ])

    // 获取所有图片URL用于预加载
    const allImageUrls = memories.map(memory => memory.images)
    const { loadedImages, failedImages } = useImagePreloader(allImageUrls)

    const categories = [
        { key: 'all', label: '全部回忆', icon: Cloud },
        { key: '约会', label: '约会', icon: Heart },
        { key: '旅行', label: '旅行', icon: Camera },
        { key: '特别日子', label: '特别日子', icon: Sparkles },
        { key: '日常', label: '日常', icon: CalendarHeart },
        { key: '礼物', label: '礼物', icon: Gift }
    ]

    const filteredMemories = activeCategory === 'all'
        ? memories
        : memories.filter(memory => memory.category === activeCategory)

    const addMemory = (memory) => {
        setMemories([...memories, {...memory, id: memories.length + 1}])
        setShowForm(false)
    }

    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{
                backgroundImage: `url(${romanticBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* 背景遮罩 */}
            <motion.div
                className="absolute inset-0 bg-white/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* 浮动装饰 */}
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
                    <Camera className="w-7 h-7 text-pink-500/50" />
                </motion.div>
            </div>

            {/* 主内容 */}
            <div className="relative z-10">
                {/* 头部 */}
                <motion.header
                    className="pt-20 pb-12 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-4"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        我们的浪漫回忆
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-700 flex items-center justify-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Heart className="w-5 h-5 text-pink-500" />
                        <span>珍藏我们在一起的每一个美好瞬间</span>
                        <Heart className="w-5 h-5 text-pink-500" />
                    </motion.p>
                </motion.header>

                {/* 分类导航 */}
                <motion.div
                    className="max-w-6xl mx-auto px-4 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(({ key, label, icon: Icon }) => (
                            <motion.button
                                key={key}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                    activeCategory === key
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-white/80 text-gray-700 hover:bg-white/90 hover:shadow-md'
                                }`}
                                onClick={() => setActiveCategory(key)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* 记忆网格 */}
                <div className="max-w-6xl mx-auto px-4 pb-12">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <AnimatePresence>
                            {filteredMemories.map((memory, index) => (
                                <MemoryCard
                                    key={memory.id}
                                    memory={memory}
                                    index={index}
                                    loadedImages={loadedImages}
                                    failedImages={failedImages}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* 底部 */}
                <motion.footer
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 mx-4 max-w-md mx-auto">
                        <p className="text-gray-600 flex items-center justify-center space-x-2">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <span>用心珍藏，用爱守护</span>
                            <Sparkles className="w-4 h-4 text-purple-500" />
                        </p>
                    </div>
                </motion.footer>
            </div>
        </div>
    )
}

// 记忆卡片组件
function MemoryCard({ memory, index, loadedImages, failedImages }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const [imageError, setImageError] = useState(false)

    const currentImage = memory.images[currentImageIndex]
    const hasMultipleImages = memory.images.length > 1
    const isImageLoaded = loadedImages.has(currentImage)
    const isImageFailed = failedImages.has(currentImage) || imageError

    const nextImage = useCallback(() => {
        if (hasMultipleImages) {
            setCurrentImageIndex((prev) => (prev + 1) % memory.images.length)
        }
    }, [hasMultipleImages, memory.images.length])

    const prevImage = useCallback(() => {
        if (hasMultipleImages) {
            setCurrentImageIndex((prev) => (prev - 1 + memory.images.length) % memory.images.length)
        }
    }, [hasMultipleImages, memory.images.length])

    return (
        <motion.div
            className="group relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
        >
            {/* 图片容器 */}
            <div className="relative h-64 overflow-hidden">
                {/* 图片加载骨架屏 */}
                {!isImageLoaded && !isImageFailed && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-pink-300" />
                    </div>
                )}

                {/* 图片加载失败占位 */}
                {isImageFailed && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 flex flex-col items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-pink-400 mb-2" />
                        <span className="text-sm text-pink-600">图片加载失败</span>
                    </div>
                )}

                {/* 实际图片 */}
                {isImageLoaded && (
                    <motion.img
                        src={currentImage}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onError={() => setImageError(true)}
                    />
                )}

                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* 多图片导航按钮 */}
                {hasMultipleImages && isImageLoaded && (
                    <>
                        <motion.button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all duration-200"
                            onClick={prevImage}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showDetails ? 1 : 0 }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all duration-200"
                            onClick={nextImage}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showDetails ? 1 : 0 }}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>

                        {/* 图片指示器 */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                            {memory.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* 图片数量标识 */}
                {hasMultipleImages && (
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs flex items-center space-x-1">
                        <Camera className="w-3 h-3" />
                        <span>{memory.images.length}</span>
                    </div>
                )}
            </div>

            {/* 卡片内容 */}
            <div className="p-4">
                <motion.h3
                    className="text-xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {memory.title}
                </motion.h3>

                <motion.div
                    className="flex items-center space-x-4 text-sm text-gray-600 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        <span>{memory.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>{memory.location}</span>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                {memory.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <motion.span
                                    className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {memory.category}
                                </motion.span>
                                {hasMultipleImages && (
                                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                                        <Camera className="w-3 h-3" />
                                        <span>{currentImageIndex + 1}/{memory.images.length}</span>
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default MemoryPage