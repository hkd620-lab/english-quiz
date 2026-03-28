import { createBrowserRouter } from "react-router-dom";
import Home from "./app/screens/Home";
import Quiz from "./app/screens/Quiz";
import WrongNotes from "./app/screens/WrongNotes";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/wrong", element: <WrongNotes /> },
]);
