import React, { useState } from 'react';
import './MemoryPage.css';
const MemoryPage = () =>  {
    const [activeCategory, setActiveCategory] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [memories, setMemories] = useState([
        {
            id: 1,
            title: "告白の日",
            date: "2025-06-06",
            location: "中央公园",
            description: "",
            category: "特别日子",
            image: "img/20250606.jpg"
        },
        {
            id: 2,
            title: "第一次约会",
            date: "2025-06-10",
            location: "狮山公园",
            description: "",
            category: "约会",
            image: "img/20250610.jpg"
        },
        {
            id: 3,
            title: "公园散步",
            date: "2025-06-13",
            location: "石湖公园",
            description: "",
            category: "约会",
            image: "img/20250613.jpg"
        },
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
            className={`memory-card`}
            style = {{ background: `url(${memory.image}) center/cover` }}
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

export default MemoryPage;