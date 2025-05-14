import styles from "./App.module.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { useTodos } from "./hooks/todo";
import { Alert } from "./components/Alert/Alert";
import { Loader } from "./components/Loader/Loader";
// const defaultTodos = [
//   {
//     id: "1",
//     name: "Buy groceries",
//     description: "Milk, Bread, Eggs",
//     deadline: "2025-05-10",
//     priority: "High",
//     complete: false,
//   },
//   {
//     id: "2",
//     name: "Finish project",
//     description: "Complete React assignment",
//     deadline: "2025-05-12",
//     priority: "Medium",
//     complete: false,
//   },
//   {
//     id: "3",
//     name: "Workout",
//     description: "Gym session at 7 PM",
//     deadline: "",
//     priority: "Low",
//     complete: true,
//   },
// ];

function App() {
  const todos = useTodos();
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src="to-do-list.png" alt="logo" className={styles.appLogo} />
        <h2 className={styles.appTitle}>To-Do-App</h2>
      </header>
      <div className={styles.appContent}>
        {todos.isLoading && <Loader />}
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}>{todos.error.message}</Alert>
        )}
        <TodoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filter} />
        <TodoList todos={todos.data} onUpdate={todos.update} onDelete={todos.delete} />
      </div>
    </div>
  );
}

export default App;
