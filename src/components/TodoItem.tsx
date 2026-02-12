import type { FC } from 'hono/jsx';

import type { Todo } from '../types.js';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  return (
    <li>
      <dir class="buttons">
      <form method="post" action={`/update/${todo.id}`}>
        <input type="checkbox" name="finished" checked={todo.finished} />
        <input type="text" name="title" value={todo.title} />
        <button>Uppfæra</button>
      </form>
      
      <form method="post" action={`/delete/${todo.id}`}>
        <button>Eyða</button>
      </form>
      </dir>

    </li>
  )
}