import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './PostNew.module.css'

export default function PostNew() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)

    const fd = new FormData()
    fd.append('title', title)
    fd.append('content', content)
    if (image) fd.append('image', image)

    const res = await fetch('/api/posts', { method: 'POST', body: fd })
    if (res.ok) {
      const post = await res.json()
      navigate(`/gallery/${post.id}`)
    } else {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <Link to="/gallery" className={styles.back}>&larr; 갤러리로</Link>
      <h1 className={styles.heading}>새 글 작성</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          제목
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          내용
          <textarea
            className={styles.textarea}
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
          />
        </label>

        <label className={styles.label}>
          사진
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {preview && (
          <div className={styles.preview}>
            <img src={preview} alt="미리보기" />
          </div>
        )}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? '등록 중...' : '등록'}
        </button>
      </form>
    </main>
  )
}
