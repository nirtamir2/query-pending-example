import { type NextPage } from "next";

import { api } from "../utils/api";

function useAddNoteMutation() {
  const utils = api.useContext();
  return api.notes.createNote.useMutation({
    onMutate: (variables) => {
      const fakeId = `fake_${Math.random()}`;
      utils.notes.getNotes.setData(undefined, (prevNotes) => {
        if (prevNotes == null) {
          return prevNotes;
        }
        return [...prevNotes, { id: fakeId, text: variables.name }];
      });
      return { fakeId };
    },
    onSuccess: (newTodo, variables, context) => {
      utils.notes.getNotes.setData(undefined, (prevNotes) => {
        if (prevNotes == null) {
          return prevNotes;
        }
        return [
          ...prevNotes.filter((note) => note.id !== context?.fakeId),
          newTodo,
        ];
      });
    },
    onError: (error, variables, context) => {
      utils.notes.getNotes.setData(undefined, (prevNotes) => {
        if (prevNotes == null) {
          return prevNotes;
        }
        return prevNotes.filter((note) => note.id !== context?.fakeId);
      });
    },
  });
}

const Home: NextPage = () => {
  const notesQuery = api.notes.getNotes.useQuery();

  const addNoteMutation = useAddNoteMutation();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          {notesQuery.data?.map((note) => (
            <div key={note.id}>{note.id} {note.text}</div>
          )) ?? "No todos"}
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
