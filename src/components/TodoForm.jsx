import { useState } from "react";
import styles from "../App.module.css"; // Updated path for modular styling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTodoSchema } from "../schemas/todo";
import { TodoFormFields } from "./TodoFormFields/TodoFormFields";
import { PRIORITY_DEFAULT } from "../constants/priority";
export function TodoForm({ onCreate }) {
    const [showAllFields, setShowAllFields] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(getTodoSchema({ isNew: true })),
        defaultValues: {
            description: "",
            deadline: "",
            priority: PRIORITY_DEFAULT
        }
    })

    function handleCreate(data) {
        onCreate(data);
        reset();
    }

    return (
        <div className={styles.todoForm}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <h2>
                    New To-Do
                    <button
                        type="button"
                        onClick={() => setShowAllFields(!showAllFields)}
                    >
                        {showAllFields ? "Hide" : "Show"}
                    </button>
                </h2>

                <TodoFormFields showAllFields={showAllFields} register={register} errors={errors} />

                <hr className={styles.divider} />
                <button type="submit" className={styles.addButton}>Add</button>
            </form>
        </div>
    );
}
