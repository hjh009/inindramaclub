import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>인인극회</h1>
          <p>무대 위에서 살아 숨쉬는 이야기</p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.container}>
          <h2>동아리 소개</h2>
          <p>
            인인극회는 연극을 사랑하는 사람들이 모여 함께 무대를 만들어가는 동아리입니다.<br />
            공연 기획부터 연출, 연기, 스태프까지 모든 과정을 직접 경험하며 성장합니다.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 인인극회. All rights reserved.</p>
      </footer>
    </>
  )
}
