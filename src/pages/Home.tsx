import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import WelcomeCard from "../components/WelcomeCard";
import MemoriesSection from "../components/MemoriesSection";
import LoveStats from "../components/LoveStats";
import { db } from "../firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";


type Appointment = {
  id: number;
  title: string;
  date: string;
  location: string;
  notes: string;
  emoji: string;
  favorite: boolean;
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("💖");
  const [favorite, setFavorite] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  async function addAppointment() {
  if (!title || !date) return;

  const newAppointment: Appointment = {
    id: Date.now(),
    title,
    date,
    location,
    notes,
    emoji,
    favorite,
  };

  try {
    console.log("Sto salvando su Firebase");

    await addDoc(
      collection(db, "appointments"),
      {
        title,
        date,
        location,
        notes,
        emoji,
        favorite,
        createdAt: Date.now(),
      }
    );

    console.log("Salvato!");
  } catch (error) {
    console.error(
      "Errore Firebase:",
      error
    );
  }

  setAppointments((prev) => [
    ...prev,
    newAppointment,
  ]);

  setTitle("");
  setDate("");
  setLocation("");
  setNotes("");
  setEmoji("💖");
  setFavorite(false);

  setShowModal(false);
}

  function deleteAppointment(id: number) {
    setAppointments((prev) =>
      prev.filter((a) => a.id !== id)
    );
  }

  function logout() {
    localStorage.removeItem("loggedIn");
    window.location.reload();
  }

  const relationshipStart = new Date("2026-03-26");

  const daysTogether = Math.max(
    0,
    Math.floor(
      (Date.now() - relationshipStart.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const futureAppointments = [...appointments]
    .filter(
      (a) =>
        new Date(a.date).getTime() >=
        new Date().setHours(0, 0, 0, 0)
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  const nextAppointment = futureAppointments[0];

  const daysUntilNext = nextAppointment
    ? Math.ceil(
        (new Date(nextAppointment.date).getTime() -
          Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const countdownText =
    daysUntilNext === null
      ? "Nessun appuntamento"
      : daysUntilNext === 0
      ? "È oggi! ❤️"
      : `${daysUntilNext} giorni`;

return (
  <div className="min-h-screen bg-black text-white overflow-x-hidden">

    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[220px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[180px]" />
    </div>

    <div className="relative max-w-5xl mx-auto px-4 py-6 pb-32">

      <div className="flex items-start justify-between mb-8">

        <div>
          <p className="text-zinc-500 text-sm mb-2">
            Il vostro spazio privato ❤️
          </p>

          <h1 className="text-3xl md:text-5xl font-bold">
            Love Planner
          </h1>
        </div>

        <button
          onClick={logout}
          className="
            w-11
            h-11
            rounded-xl
            bg-zinc-900/80
            border
            border-zinc-800
            hover:border-zinc-600
            transition
          "
        >
          🚪
        </button>

      </div>

      <WelcomeCard name="Alice" />

      <div
        className="
          mt-6
          rounded-3xl
          border
          border-violet-500/20
          bg-zinc-900/70
          backdrop-blur-xl
          p-6
          mb-6
        "
      >
        <p className="text-zinc-400 text-sm">
          PROSSIMO APPUNTAMENTO
        </p>

        {nextAppointment ? (
          <>
            <h2 className="text-2xl md:text-4xl font-bold mt-3">
              {nextAppointment.emoji} {nextAppointment.title}
            </h2>

            <p className="text-zinc-400 mt-3">
              📅 {nextAppointment.date}
            </p>

            {nextAppointment.location && (
              <p className="text-zinc-400 mt-1">
                📍 {nextAppointment.location}
              </p>
            )}

            <div
              className="
                mt-5
                inline-flex
                px-4
                py-2
                rounded-full
                bg-pink-500/10
                border
                border-pink-500/20
                text-pink-400
                font-semibold
              "
            >
              ⏳ {countdownText}
            </div>
          </>
        ) : (
          <p className="text-zinc-400 mt-4">
            Nessun appuntamento programmato
          </p>
        )}
      </div>

      <LoveStats
        daysTogether={daysTogether}
        appointmentsCount={appointments.length}
        countdownText={countdownText}
      />

      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold">
            📅 I nostri appuntamenti
          </h2>

          <span className="text-zinc-500 text-sm">
            {appointments.length} eventi
          </span>

        </div>

        <div className="grid gap-4">

          {[...appointments]
            .sort(
              (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
            )
            .map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDelete={deleteAppointment}
              />
            ))}

        </div>

      </div>

      <div className="mt-10">
        <MemoriesSection />
      </div>

    </div>

    <button
      onClick={() => setShowModal(true)}
      className="
        fixed
        bottom-6
        right-6
        w-16
        h-16
        rounded-full
        bg-gradient-to-r
        from-pink-500
        to-violet-500
        text-4xl
        font-bold
        shadow-2xl
        hover:scale-110
        transition
        z-50
      "
    >
      +
    </button>

    <AppointmentModal
      show={showModal}
      title={title}
      date={date}
      location={location}
      notes={notes}
      emoji={emoji}
      favorite={favorite}
      setTitle={setTitle}
      setDate={setDate}
      setLocation={setLocation}
      setNotes={setNotes}
      setEmoji={setEmoji}
      setFavorite={setFavorite}
      onClose={() => setShowModal(false)}
      onSave={addAppointment}
    />

  </div>
);
}