import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"

import { Comment } from "./Comment"
import { Avatar } from "../Avatar"

import styles from "./styles.module.css"


interface Author {
  avatarURL: string,
  name: string,
  role: string
}
interface Content {
  type: 'paragraph' | 'link',
  content: string
}

export interface PostTypes {
  id: number,
  author: Author,
  content: Content[]
  publishedAt: Date,
}
interface PostProps {
  post: PostTypes
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    "Post muito bacana, hein!", "oi"
  ])

  const [newCommentText, setNewCommentText] = useState("")

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })


  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    
    setComments([newCommentText, ...comments])
    
    setNewCommentText(" ")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório")
  }

  const isNewCommentInputEmpty = newCommentText.length === 0


  return (
  <article className={styles.post}>
    <header>
      <div>
        <Avatar src={post.author.avatarURL} />
        <div>
          <strong>{post.author.name}</strong>
          <span>{post.author.role}</span>
        </div>
      </div>
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
    </header>

    <div>
      {post.content.map(line => {
        if(line.type === "paragraph") {
          return <p key={line.content}>{line.content}</p>;
        } else if(line.type === "link") {
          return <p key={line.content}><a href="#">{line.content}</a></p>
        }
      })}
    </div>

    <form onSubmit={handleCreateNewComment}>
      <strong>Deixe seu feedback</strong>

      <textarea 
        name="comment"
        placeholder="Deixe seu comentário"
        value={newCommentText}
        onChange={handleNewCommentChange}
        onInvalid={handleNewCommentInvalid}
        required
      />

      <footer>
        <button 
          disabled={isNewCommentInputEmpty}
          type="submit">
          Publicar
        </button>
      </footer>
    </form>

    <div>
      {comments.map(comment => {
        return (
          <Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={deleteComment}
          />
        )
      })}
    </div>
  </article>
)
}