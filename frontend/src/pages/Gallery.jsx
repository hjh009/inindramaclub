import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Gallery.module.css'

export default function Gallery() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>갤러리</h1>
        <Link to="/gallery/new" className={styles.writeBtn}>글쓰기</Link>
      </div>

      {loading && <p className={styles.empty}>불러오는 중...</p>}
      {!loading && posts.length === 0 && <p className={styles.empty}>아직 게시물이 없습니다.</p>}

      <div className={styles.grid}>
        {posts.map(post => (
          <Link to={`/gallery/${post.id}`} key={post.id} className={styles.card}>
            <div className={styles.thumb}>
              {post.imageFileName
                ? <img src={`/api/files/${post.imageFileName}`} alt={post.title} />
                : <div className={styles.noImage}>No Image</div>
              }
            </div>
            <div className={styles.info}>
              <p className={styles.title}>{post.title}</p>
              <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
