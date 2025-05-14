import styles from "./TodoList.module.css";
import { TodoListItem } from "../TodoListItem/TodoListItem";
export function TodoList({ todos, onUpdate, onDelete }) {

    return (
        <section className={styles.todoList}>
            <h3>To-Do's</h3>
            {!todos.length &&
                <p>Sorry, you don't have any todo's yet</p>
            }
            <ul>
                {todos.map((todo) => (
                    <TodoListItem key={todo.key} onUpdate={onUpdate} todo={todo} onDelete={onDelete} />
                ))}
            </ul>
        </section>
    );
}
