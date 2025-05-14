import { useState, useEffect } from "react";
import { api } from "../api";

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [filters, setFilters] = useState({
        completed: 'all',
        priority: 'all',
    });
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    async function fetchTodos() {
        setIsLoading(true);
        try {
            const data = await api.todos.getALL(filters);
            setTodos(data);
        } catch (error) {
            setErrorMessage("Failed to get todo's. Please try again later.");
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchTodos();
    }, [filters])


    async function handleCreate(newTodo) {
        setIsLoading(true);
        try {
            await api.todos.create(newTodo);
            await fetchTodos();
        } catch (error) {
            setErrorMessage("Failed to create todo. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUpdate(id, newTodo) {
        setIsLoading(true);
        try {
            await api.todos.update(id, newTodo);
            await fetchTodos();
        } catch (error) {
            setErrorMessage("Failed to update todo. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id) {
        setIsLoading(true);
        try {
            await api.todos.delete(id);
            await fetchTodos();
        } catch (error) {
            setErrorMessage("Failed to delete todo. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }
    return {
        isLoading,
        data: todos,
        fetch: fetchTodos,
        filter: setFilters,
        create: handleCreate,
        update: handleUpdate,
        delete: handleDelete,
        error: {
            message: errorMessage,
            clear: () => setErrorMessage(),
        }

    }

    // function handleCreate(newTodo) {
    //   setTodos((prevTodos) => [...prevTodos, { id: `${prevTodos.length + 1}`, ...newTodo }]);
    // }

    // function handleUpdate(id, newTodo) {
    //   setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? newTodo : todo));
    // }

    // function handleDelete(id) {
    //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    // }


    // // The filtering function
    // function filterTodos(todo) {
    //   const { completed, priority } = filters;

    //   const matchCompleted =
    //     completed === "all" ||
    //     (completed === "completed" && todo.complete) ||
    //     (completed === "active" && !todo.complete);

    //   const matchPriority =
    //     priority === "all" || todo.priority.toLowerCase() === priority.toLowerCase();

    //   return matchCompleted && matchPriority;
    // }

}