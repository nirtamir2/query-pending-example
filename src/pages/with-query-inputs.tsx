import { type NextPage } from "next";

import { api } from "../utils/api";


const Home: NextPage = () => {
  const notesQuery = api.notes.getNotes.useQuery();
  const addNoteMutation = api.notes.createNote.useMutation();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          {notesQuery.data?.map((note) => (
            <div key={note.id}>{note.id} {note.text}</div>
          ))}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {(addNoteMutation.inputs as Array<string>).map(fakeTodo =>
            <div key={fakeTodo}>{fakeTodo}</div>
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const name = event.currentTarget.name.value as string;

            addNoteMutation.mutate({ name });
            event.currentTarget.reset();
          }}
        >
          <input className="rounded border" name="name" type="text" />
          <button type="submit">+</button>
        </form>
      </main>
    </>
  );
};

export default Home;
