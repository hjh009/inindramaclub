import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './PostDetail.module.css'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(setPost)
  }, [id])

  async function handleDelete() {
    if (!confirm('삭제하시겠습니까?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    navigate('/gallery')
  }

  if (!post) return <main className={styles.page}><p>불러오는 중...</p></main>

  return (
    <main className={styles.page}>
      <Link to="/gallery" className={styles.back}>&larr; 갤러리로</Link>

      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</p>

      {post.imageFileName && (
        <div className={styles.imageWrap}>
          <img src={`/api/files/${post.imageFileName}`} alt={post.title} />
        </div>
      )}

      <p className={styles.content}>{post.content}</p>

      <button onClick={handleDelete} className={styles.deleteBtn}>삭제</button>
    </main>
  )
}
