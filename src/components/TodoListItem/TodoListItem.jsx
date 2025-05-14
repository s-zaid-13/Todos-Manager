import { useState } from "react";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priority";
import { TodoFormFields } from "../TodoFormFields/TodoFormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTodoSchema } from "../../schemas/todo";
import styles from "./TodoListItem.module.css";

export function TodoListItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(getTodoSchema()), defaultValues: todo
    });
    function handleCompleted(event) {
        onUpdate(todo.id, { ...todo, complete: event.target.checked });
    }
    function handleEdit(data) {

        onUpdate(todo.id, data);
        setIsEditing(false)
    }
    const viewingTemplate = (
        <>
            <input
                type="checkbox"
                name="completed"
                checked={todo.complete}
                onChange={handleCompleted}
            />
            <div className={styles.todoContent} >
                <div className={styles.todoHeader}>
                    <div className={styles.todoName} style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.name}</div>
                    <div className={styles.Controls}>
                        <button onClick={() => { setIsEditing(true) }}>✏️</button>
                        <button onClick={() => onDelete(todo.id)} >🗑️</button>
                    </div>
                </div>
                <div style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>
                    {todo.description && <div className={styles.todoDescription}>{todo.description}</div>}
                    <div className={styles.todoMeta}>
                        {todo.deadline && <span>{todo.deadline}</span>}
                        {todo.priority && todo.priority !== PRIORITY_DEFAULT && (
                            <span style={{ color: PRIORITIES[todo.priority].color }}>
                                {PRIORITIES[todo.priority].label}
                            </span>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
    const editingTemplate = (
        <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)}>
            <TodoFormFields todo={todo} register={register} errors={errors} />
            <div className={styles.Controls}>
                <input type="submit" value="💾" />
                <input type="reset" value="❌" />
            </div>
        </form>

    )
    return (
        <li>
            {isEditing ? editingTemplate : viewingTemplate}
        </li>
    );
}
