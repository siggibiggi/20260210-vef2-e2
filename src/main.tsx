import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { ErrorPage } from './components/ErrorPage.js';
import { createTodo, listTodos, updateTodo, deleteTodo, deleteFinishedTodos } from './lib/db.js';
import { TodoItemSchema } from './lib/validation.js';
import { z } from 'zod';

// búum til og exportum Hono app
export const app = new Hono();

// sendir út allt sem er í static möppunni
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  const todos = await listTodos();

  if (!todos) {
    return c.text('villa')
  }

  return c.html(<TodoPage todos={todos} />);
});

app.post('/add', async (c) => {
  const body = await c.req.parseBody();
  //console.log(body)

  const result = TodoItemSchema.safeParse(body)

  if (!result.success) {
    console.error(z.flattenError(result.error))
    return c.html(
      <ErrorPage>
        <p>Titill ekki rétt formaður</p>
      </ErrorPage>,
      400,
    )
  }

  const dbResult = await createTodo(result.data);

  if (!dbResult) {
    return c.html(
      <ErrorPage>
        <p>gat ekki vistað gagnagrunn</p>
      </ErrorPage>,
      500
    )
  }

  //return c.text('post móttekið!')
  return c.redirect('/');
});

app.post('/update/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.parseBody();
  
  let finished = false;

  if (body['finished']) {
    if (body['finished'] === 'on') {
      finished = true;
    }
  }

  const title = body['title'] as string;

  await updateTodo(Number(id), title, finished);
  return c.redirect('/');
});

app.post('/delete/finished', async (c) => {
  await deleteFinishedTodos();
  return c.redirect('/');
});

app.post('/delete/:id', async (c) => {
  const id = c.req.param('id');
  await deleteTodo(Number(id));
  return c.redirect('/');
});

app.notFound((c) => {
  return c.html(
    <ErrorPage>
      <h1>ekkert að finna hér ;-))</h1>
    </ErrorPage>,
    404
  );
});