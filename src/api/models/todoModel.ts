import supabase from "../../supabase";
import dayjs from "dayjs";

let id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

export interface Todo {
  completed: boolean | null;
  completed_at: string | null;
  created_at: string;
  id: number;
  title: string | null;
}

export const handleQueryGetTodos = async (): Promise<Todo[]> => {
  try {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as Todo[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const handleQueryGetTodo = async (id: number): Promise<Todo | null> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const handleQueryAddTodo = async (
  title: string,
): Promise<Todo | null> => {
  try {
    const todo = {
      id: id++,
      title,
      completed: false,
      completed_at: null,
      created_at: dayjs().toISOString(),
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([todo])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const handleQueryDeleteTodo = async (
  id: number,
): Promise<Todo | null> => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return { id } as Todo;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const handleQueryUpdateTodo = async (
  id: number,
  title: string,
): Promise<Todo | null> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update({ title })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const handleQueryToggleTodo = async (
  id: number,
): Promise<Todo | null> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return null;
    }

    const completed = !data[0].completed;
    const completed_at = completed ? dayjs().toISOString() : null;

    const { data: updatedData, error: updateError } = await supabase
      .from("todos")
      .update({ completed, completed_at })
      .eq("id", id)
      .select();

    if (updateError) {
      throw new Error(updateError.message);
    }

    return updatedData ? updatedData[0] : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
