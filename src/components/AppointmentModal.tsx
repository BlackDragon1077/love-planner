type Props = {
  show: boolean;

  title: string;
  date: string;
  location: string;
  notes: string;
  emoji: string;
  favorite: boolean;

  setTitle: (value: string) => void;
  setDate: (value: string) => void;
  setLocation: (value: string) => void;
  setNotes: (value: string) => void;
  setEmoji: (value: string) => void;
  setFavorite: (value: boolean) => void;

  onClose: () => void;
  onSave: () => void;
};

export default function AppointmentModal({
  show,
  title,
  date,
  location,
  notes,
  emoji,
  favorite,
  setTitle,
  setDate,
  setLocation,
  setNotes,
  setEmoji,
  setFavorite,
  onClose,
  onSave,
}: Props) {
  if (!show) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-zinc-900
          border
          border-zinc-800
          p-6
        "
      >
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Nuovo appuntamento
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="flex flex-col gap-4">

          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Emoji (🍝)"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Luogo"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Note"
            rows={4}
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) =>
                setFavorite(e.target.checked)
              }
            />

            ⭐ Preferito
          </label>

          <button
            onClick={onSave}
            className="
              rounded-xl
              py-3
              bg-gradient-to-r
              from-pink-500
              to-violet-500
              font-semibold
            "
          >
            Salva appuntamento
          </button>

        </div>
      </div>
    </div>
  );
}