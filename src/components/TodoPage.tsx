import type { FC } from 'hono/jsx';

import type { Todo } from '../types.js';
import { TodoList } from './TodoList.js';
import { Layout } from './Layout.js';

type TodoPageProps = {
  todos?: Todo[];
};

export const TodoPage: FC<TodoPageProps> = ({ todos = [] }) => {
  const finished = todos.filter(i => i.finished === true)
  const unfinished = todos.filter(i => !i.finished)

  return (
    <Layout title="TodoListinn">
      <main>
      <section class="todo-list">
        <form method="post" action="/add">
          <input type="text" name="title" />
          <button>bæta við</button>
        </form>
        <form method="post" action="/delete/finished">
          <button>Eyða finished :)</button>
        </form>

        <TodoList title="" todos={todos} />
      </section>
      </main>

    </Layout>
  );
};
/*
        <TodoList title="done" todos={finished} />
        <TodoList title="not done" todos={unfinished} />
*/