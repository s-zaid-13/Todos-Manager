import { PRIORITIES } from "../../constants/priority";
import styles from "./TodoFormFields.module.css";
export function TodoFormFields({ showAllFields = true, todo = {}, register, errors }) {
    return (
        <>
            <div className={styles.formGroup}>
                <label>Name*</label>
                <input type="text" defaultValue={todo.name}
                    aria-invalid={!!errors.name}
                    {...register("name")} />
                {/* {...register("name",
                        {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name should be greater than 3 charcters"
                            }
                            , maxLength: {
                                value: 50,
                                message: "Name should be less than 50 charcters"
                            }
                        })} /> */}
                {!!errors.name && (<span className={styles.FormFieldError}>{errors.name.message}</span>)}

            </div>

            {showAllFields && (
                <>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea defaultValue={todo.description}
                            aria-invalid={!!errors.description}
                            {...register("description")} />
                        {!!errors.description && (<span className={styles.FormFieldError}>{errors.description.message}</span>)}
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.inputRow}>
                        <div className={styles.formGroup}>

                            <label>Deadline</label>
                            <input
                                type="date"
                                placeholder="dd/mm/yyyy"
                                defaultValue={todo.deadline}
                                aria-invalid={!!errors.deadline}

                                {...register("deadline")}
                            // {...register("deadline", {
                            //     min: !todo.id
                            //         ? {
                            //             value: new Date().toISOString().split("T")[0],
                            //             message: "Date can't be in the past",
                            //         }
                            //         : undefined,
                            // })}

                            />
                            {!!errors.deadline && (<span className={styles.FormFieldError}>{errors.deadline.message}</span>)}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Priority</label>
                            <select name="priority" defaultValue={todo.priority}
                                aria-invalid={!!errors.priority}
                                {...register("priority")}>
                                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}

                            </select>
                            {!!errors.priority && (<span className={styles.FormFieldError}>{errors.priority.message}</span>)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
