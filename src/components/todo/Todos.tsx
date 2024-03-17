import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddTodosForm } from "./AddTodosForm";
import TodoList from "./TodoList";

function Todos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
        <CardDescription>Ajouter vos taches</CardDescription>
      </CardHeader>
      <CardContent>
        <AddTodosForm />
      </CardContent>
      <CardContent>
        <TodoList />
      </CardContent>
    </Card>
  );
}

export default Todos;
