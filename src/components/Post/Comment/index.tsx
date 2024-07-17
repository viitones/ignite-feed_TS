import { useState } from "react"

import { ThumbsUp, Trash } from "@phosphor-icons/react"

import { Avatar } from "../../Avatar"

import styles from "./styles.module.css"


interface ComentProps {
  content: string,
  onDeleteComment: (commentToDelete: string) => void
}

export function Comment({ content, onDeleteComment }: ComentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  }

return (
  <section className={styles.comment}>
    <Avatar hasBorder={false} src="https://github.com/viitones.png" alt=""/>

    <div>
      <div>
        <header>
          <div>
            <strong>Victor Hugo</strong>

            <time title="16 de julho ás 13:40" dateTime="2024-07-16">Cerca de 1h atrás</time>
          </div>

            <button onClick={handleDeleteComment} title="deletar">
              <Trash size={24} />
            </button>
        </header>

        <p>{content}</p>
      </div>

      <footer>
        <button onClick={handleLikeComment}>
          <ThumbsUp />
          Aplaudir <span>{likeCount}</span>
        </button>
      </footer>
    </div>
  </section>
)
}