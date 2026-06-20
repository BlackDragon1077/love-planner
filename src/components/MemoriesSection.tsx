import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
collection,
addDoc,
deleteDoc,
doc,
onSnapshot,
} from "firebase/firestore";

type Memory = {
id: string;
title: string;
date: string;
description: string;
};

export default function MemoriesSection() {
const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [description, setDescription] = useState("");

const [memories, setMemories] = useState<Memory[]>([]);

useEffect(() => {
const unsubscribe = onSnapshot(
collection(db, "memories"),
(snapshot) => {
const data: Memory[] = snapshot.docs.map((doc) => ({
id: doc.id,
title: doc.data().title || "",
date: doc.data().date || "",
description: doc.data().description || "",
}));


    setMemories(data);
  }
);

return () => unsubscribe();


}, []);

async function addMemory() {
if (!title || !date) return;


try {
  await addDoc(collection(db, "memories"), {
    title,
    date,
    description,
    createdAt: Date.now(),
  });

  setTitle("");
  setDate("");
  setDescription("");
} catch (error) {
  console.error("Errore salvataggio:", error);
}


}

async function deleteMemory(id: string) {
try {
await deleteDoc(doc(db, "memories", id));
} catch (error) {
console.error("Errore eliminazione:", error);
}
}

return ( <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-6 mt-10"> <h2 className="text-2xl font-bold mb-6">
📸 I nostri ricordi </h2>

```
  <div className="grid gap-4 mb-8">
    <input
      type="text"
      placeholder="Titolo ricordo"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
    />

    <textarea
      rows={4}
      placeholder="Descrivi il ricordo..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
    />

    <button
      onClick={addMemory}
      className="rounded-xl py-3 bg-gradient-to-r from-pink-500 to-violet-500 font-semibold"
    >
      Salva ricordo ❤️
    </button>
  </div>

  <div className="grid gap-6">
    {memories.map((memory) => (
      <div
        key={memory.id}
        className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold">
              ❤️ {memory.title}
            </h3>

            <p className="text-zinc-500 mt-2">
              📅 {memory.date}
            </p>

            <p className="mt-4 text-zinc-300">
              {memory.description}
            </p>
          </div>

          <button
            onClick={() => deleteMemory(memory.id)}
            className="text-red-400 hover:text-red-300"
          >
            🗑️
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

);
}
