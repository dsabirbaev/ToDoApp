

import { useReducer, useEffect } from "react";
import "./style.scss"

import { Button, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
const index = () => {

    const ints = {
        todo: [],
        taskTitle: ""
    }
    const reducer = (state, action) => {
        // console.log("state= ", state);
        // console.log("action= ", action);

        switch (action.type) {
            case "SET_TITLE":
                return { ...state, taskTitle: action.payload };
            case "SEND":
                return { ...state, todo: [...state.todo, action.payload] };
            case "DELETE":
                return { ...state, todo: [...action.payload] };
            default:
                return state;
        }


    }
    const [state, dispatch] = useReducer(reducer, ints);

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: state.taskTitle,
            id: Date.now(),
        }

        if (newTask.title.trim().length > 0) {
            dispatch({ type: "SEND", payload: newTask });
            dispatch({ type: "SET_TITLE", payload: "" });
            toast.success("Added task!", {autoClose: 1000});
        }else{
            toast.info("You should add task!", {autoClose: 1000});
        }
    }

    const deleteTask = (taskId) => {
        const delTask = state.todo.filter(item => item.id !== taskId);
        dispatch({ type: "DELETE", payload: delTask });
        toast.success("Deleted task!", {autoClose: 1000});
    };

    return (
        <section className="mt-5">
             <ToastContainer />
            <div className="container">
                <form onSubmit={addTask} className="p-5 border border-indigo-800 rounded-2xl">
                    <div className="flex max-w-md flex-col gap-4 mx-auto">
                        <div>
                            <TextInput
                                value={state.taskTitle}
                                onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
                                id="title"
                                placeholder="Enter the title"
                                type="text"
                            />
                        </div>


                        <Button type="submit" className="w-fit">
                            Add task
                        </Button>
                    </div>

                    <ul className="rounded-md mt-5">
                        <h2 className="text-[30px] text-center font-bold mb-1">To Do List</h2>

                        {
                            state.todo.length > 0 ? state.todo?.map((item, index) => {
                                return <li key={item.id} className="flex items-center justify-between border border-emerald-500 rounded-md p-2 mt-2 text-[20px]">
                                    <div className="flex items-center gap-x-2">
                                        <span className="font-bold w-[24px] h-[24px] rounded-full bg-pink-400 flex items-center justify-center">{index + 1}</span> {item.title}
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <Button className="w-[80px]" color="success" pill> Edit </Button> <Button onClick={() => deleteTask(item.id)} className="w-[80px]" color="failure" pill> Delete </Button>
                                    </div>
                                </li>
                            }) : <h1 className="font-bold text-[20px]">Data Not Found</h1>
                        }

                    </ul>
                </form>
            </div>
        </section>
    );
};

export default index;