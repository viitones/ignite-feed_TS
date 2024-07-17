import { PencilLine } from "@phosphor-icons/react"
import { Avatar } from "../Avatar"

import styles from "./styles.module.css"

export function Sidebar() {
  
return (
  <aside className={styles.sidebar}>
    <img 
      src={"https://images.unsplash.com/photo-1526374870839-e155464bb9b2?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="foto de perfil do victor" />

    <div>
      <Avatar src="https://github.com/rocketseat-education.png"/>
      <strong>Victor Hugo</strong>
      <span>Web Developer</span>
    </div>

    <footer>
      <a href="#">
        <PencilLine size={20} />
        Editar seu perfil
      </a>
    </footer>
  </aside>
)
}