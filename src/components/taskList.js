import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTask,
  reorderTasks,
} from "../features/tasks/taskSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  List,
  ListItem,
  IconButton,
  Checkbox,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = ({ onEditTask }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <Card
        sx={{
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          mb: 2,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      >
                        <CardContent>
                          <ListItem
                            secondaryAction={
                              <>
                                <IconButton
                                  edge="end"
                                  aria-label="edit"
                                  onClick={() => onEditTask(task.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => dispatch(deleteTask(task.id))}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            }
                          >
                            <Checkbox
                              checked={task.completed}
                              onChange={() => dispatch(toggleComplete(task.id))}
                            />
                            <Box>
                              <Typography
                                variant="h6"
                                style={{
                                  textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                }}
                              >
                                {task.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {task.description}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Due: {task.dueDate}
                              </Typography>
                            </Box>
                          </ListItem>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </Box>
  );
};

export default TaskList;
