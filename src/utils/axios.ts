import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const toggleTodo = async (id: number) => {
  const response = await axiosInstance.patch(`/todos/${id}`);
  return response;
};

export const deleteTodo = async (id: number) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response;
};
