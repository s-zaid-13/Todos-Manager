import { useEffect, useState } from "react";
import styles from "./TodoFilters.module.css";
import { COMPLETED_FILTERS, PRIORITY_FILTERS } from "../../constants/filters";

export function TodoFilters({ onFilter }) {
    const [completed, setCompleted] = useState("all");
    const [priority, setPriority] = useState("all");

    useEffect(() => {
        onFilter({
            completed: completed,
            priority: priority,
        });
    }, [completed, priority, onFilter]);

    return (
        <section>
            <h3>Filters</h3>
            <div className={styles.filterBoxes}>
                <label htmlFor="completed">Completed</label>
                <select
                    id="completed"
                    value={completed}
                    onChange={(event) => setCompleted(event.target.value)}
                >
                    {Object.entries(COMPLETED_FILTERS).map(([key, { label }]) => {
                        return (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        );
                    })}
                </select>
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    {Object.entries(PRIORITY_FILTERS).map(([key, { label }]) => {
                        return (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </section>
    );
}
