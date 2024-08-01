import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormHelperText,
} from "@mui/material";

const AddTaskForm = ({ open, handleClose }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({ taskName: false, dueDate: false });

  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0]; 

  const validateForm = () => {
    const newErrors = {
      taskName: !taskName,
      dueDate: !dueDate,
      description: !description,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(
        addTask({
          id: Date.now(),
          name: taskName,
          description,
          dueDate,
          completed: false,
        })
      );
      setTaskName("");
      setDescription("");
      setDueDate("");
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      paddingtop="5px"
      sx={{
        "& .MuiDialog-paper": {
          padding: "30px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Add New Task
      </DialogTitle>
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
            sx={{
              marginBottom: "20px",
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
            error={errors.taskName}
          />
          {errors.taskName && (
            <FormHelperText error sx={{ marginBottom: "10px" }}>
              Task name is required.
            </FormHelperText>
          )}
          <TextField
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              marginBottom: "20px",
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
            error={errors.description}
          />
          {errors.description && (
            <FormHelperText error sx={{ marginBottom: "10px" }}>
              description is required.
            </FormHelperText>
          )}
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            inputProps={{ min: today }}
            sx={{
              marginBottom: "20px",
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
            error={errors.dueDate}
          />
          {errors.dueDate && (
            <FormHelperText error sx={{ marginBottom: "20px" }}>
              Due date is required.
            </FormHelperText>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;
