import React, { useState } from "react";
import { Container, Button, Box } from "@mui/material";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/taskSlice";
import TaskList from "./components/taskList";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

const App = () => {
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const handleOpenEditTask = (taskId) => {
    setEditingTaskId(taskId);
    setEditTaskOpen(true);
  };

  const handleCloseEditTask = () => {
    setEditTaskOpen(false);
    setEditingTaskId(null);
  };

  return (
    <Provider store={store}>
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddTask}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            + Add New Task
          </Button>
        </Box>
        <TaskList onEditTask={handleOpenEditTask} />
        <AddTaskForm open={addTaskOpen} handleClose={handleCloseAddTask} />
        <EditTaskForm
          open={editTaskOpen}
          handleClose={handleCloseEditTask}
          taskId={editingTaskId}
        />
      </Container>
    </Provider>
  );
};

export default App;
