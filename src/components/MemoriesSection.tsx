import { useEffect, useState } from "react";

type Memory = {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
};

export default function MemoriesSection() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem("memories");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "memories",
      JSON.stringify(memories)
    );
  }, [memories]);

  function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function addMemory() {
    if (!title || !date) return;

    const newMemory: Memory = {
      id: Date.now(),
      title,
      date,
      description,
      image,
    };

    setMemories((prev) => [newMemory, ...prev]);

    setTitle("");
    setDate("");
    setDescription("");
    setImage("");
  }

  function deleteMemory(id: number) {
    setMemories((prev) =>
      prev.filter((m) => m.id !== id)
    );
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur
        p-6
        mt-10
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        📸 I nostri ricordi
      </h2>

      <div className="grid gap-4 mb-8">

        <input
          type="text"
          placeholder="Titolo ricordo"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            px-4
            py-3
          "
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            px-4
            py-3
          "
        />

        <textarea
          rows={4}
          placeholder="Descrivi il ricordo..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            px-4
            py-3
          "
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            px-4
            py-3
          "
        />

        {image && (
          <img
            src={image}
            alt="Anteprima"
            className="
              rounded-2xl
              max-h-60
              object-cover
              border
              border-zinc-700
            "
          />
        )}

        <button
          onClick={addMemory}
          className="
            rounded-xl
            py-3
            bg-gradient-to-r
            from-pink-500
            to-violet-500
            font-semibold
          "
        >
          Salva ricordo ❤️
        </button>

      </div>

      <div className="grid gap-6">

        {memories.map((memory) => (

          <div
            key={memory.id}
            className="
              rounded-3xl
              overflow-hidden
              bg-zinc-950
              border
              border-zinc-800
            "
          >

            {memory.image && (
              <img
                src={memory.image}
                alt={memory.title}
                className="
                  w-full
                  h-64
                  object-cover
                "
              />
            )}

            <div className="p-5">

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
                  onClick={() =>
                    deleteMemory(memory.id)
                  }
                  className="
                    text-red-400
                    hover:text-red-300
                  "
                >
                  🗑️
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}