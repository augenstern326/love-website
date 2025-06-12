import React, { useState } from 'react';
import './MemoryPage.css';
const MemoryPage = () =>  {
    const [activeCategory, setActiveCategory] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [memories, setMemories] = useState([
        {
            id: 1,
            title: "第一次约会",
            date: "2023-05-20",
            location: "城市公园",
            description: "那天阳光正好，我们在公园里散步聊天，第一次牵起了手。",
            category: "约会",
            image: "park"
        },
        {
            id: 2,
            title: "生日惊喜",
            date: "2023-08-15",
            location: "海边餐厅",
            description: "偷偷为她准备的生日惊喜，看到她感动得流泪的样子，我觉得一切都值得。",
            category: "特别日子",
            image: "beach"
        },
        {
            id: 3,
            title: "旅行记忆",
            date: "2023-10-01",
            location: "山间小屋",
            description: "我们一起在山间小屋度过了三天两夜，远离城市喧嚣，享受二人世界。",
            category: "旅行",
            image: "mountain"
        },
        {
            id: 4,
            title: "周末电影夜",
            date: "2023-06-10",
            location: "家中",
            description: "每周五的电影之夜是我们的固定节目，她总是看到一半就靠在我肩上睡着了。",
            category: "日常",
            image: "movie"
        },
        {
            id: 5,
            title: "节日礼物",
            date: "2023-12-24",
            location: "圣诞树下",
            description: "她为我亲手织的围巾，是我收到过最温暖的圣诞礼物。",
            category: "礼物",
            image: "gift"
        },
        {
            id: 6,
            title: "一起做饭",
            date: "2023-07-08",
            location: "厨房",
            description: "第一次一起做饭，虽然过程有点混乱，但成果意外地美味。",
            category: "日常",
            image: "cooking"
        }
    ]);

    const categories = ['all', '约会', '旅行', '特别日子', '日常', '礼物'];

    const filteredMemories = activeCategory === 'all'
        ? memories
        : memories.filter(memory => memory.category === activeCategory);

    const addMemory = (memory) => {
        setMemories([...memories, {...memory, id: memories.length + 1}]);
        setShowForm(false);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <h1>我们的浪漫回忆</h1>
                    <p>珍藏我们在一起的每一个美好瞬间</p>
                </div>
                <div className="heart-animation">❤</div>
            </header>

            <div className="container">
                <nav className="categories">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category === 'all' ? '全部回忆' : category}
                        </button>
                    ))}
                </nav>

                <div className="memory-grid">
                    {filteredMemories.map(memory => (
                        <MemoryCard key={memory.id} memory={memory} />
                    ))}
                </div>
            </div>

            {showForm && <AddMemoryForm onAdd={addMemory} onClose={() => setShowForm(false)} />}

            <footer className="footer">
                <p>用心珍藏，用爱守护 • 属于我们的浪漫回忆</p>
            </footer>
        </div>
    );
}

function MemoryCard({ memory }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div
            className={`memory-card ${memory.image}`}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
        >
            <div className={`card-content ${showDetails ? 'show-details' : ''}`}>
                <h3>{memory.title}</h3>
                {showDetails && (
                    <div className="memory-details">
                        <p className="date-location">
                            <span className="date">{memory.date}</span>
                            <span className="location">{memory.location}</span>
                        </p>
                        <p className="description">{memory.description}</p>
                        <div className="category-tag">{memory.category}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

function AddMemoryForm({ onAdd, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        category: '约会',
        image: 'park'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.date && formData.description) {
            onAdd(formData);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="add-memory-form">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>添加新回忆</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>回忆标题</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="例如：第一次约会"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>日期</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>地点</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="例如：城市公园"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>描述</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="记录下这个美好的瞬间..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>分类</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="约会">约会</option>
                                <option value="旅行">旅行</option>
                                <option value="特别日子">特别日子</option>
                                <option value="日常">日常</option>
                                <option value="礼物">礼物</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>背景图片</label>
                            <select name="image" value={formData.image} onChange={handleChange}>
                                <option value="park">公园</option>
                                <option value="beach">海滩</option>
                                <option value="mountain">山景</option>
                                <option value="cafe">咖啡馆</option>
                                <option value="movie">电影</option>
                                <option value="gift">礼物</option>
                                <option value="cooking">烹饪</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>取消</button>
                        <button type="submit" className="submit-btn">保存回忆</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MemoryPage;