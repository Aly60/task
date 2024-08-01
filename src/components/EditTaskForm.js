import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../features/tasks/taskSlice";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

const EditTaskForm = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = () => {
    if (taskName && dueDate) {
      dispatch(
        editTask({
          id: taskId,
          updatedTask: { name: taskName, description, dueDate },
        })
      );
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ paddingTop: "5px" }}
        >
          <TextField
            autoFocus
            label="Task Name"
            type="text"
            fullWidth
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            error={!taskName}
            helperText={!taskName && "taskName is required"}
          />
          <TextField
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!description}
            helperText={!description && "Description is required"}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={!dueDate}
            helperText={!dueDate && "due is required"}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskForm;
