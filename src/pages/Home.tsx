import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import WelcomeCard from "../components/WelcomeCard";
import MemoriesSection from "../components/MemoriesSection";
import LoveStats from "../components/LoveStats";

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

  function addAppointment() {
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

    setAppointments((prev) => [...prev, newAppointment]);

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
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-6">

      <div
        className="
          fixed
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-violet-500/20
          blur-[180px]
          pointer-events-none
        "
      />

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-5xl font-bold">
              ❤️ Love Planner
            </h1>

            <p className="text-zinc-400 mt-2">
              Il vostro spazio privato
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={logout}
              className="
                px-4
                rounded-xl
                border
                border-zinc-700
                hover:bg-zinc-800
                transition
              "
            >
              🚪
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="
                w-14
                h-14
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-violet-500
                text-3xl
                font-bold
                hover:scale-110
                transition
                shadow-xl
              "
            >
              +
            </button>

          </div>

        </div>

        <WelcomeCard name="Alice" />

        <LoveStats
          daysTogether={daysTogether}
          appointmentsCount={appointments.length}
          countdownText={countdownText}
        />

        <div
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/60
            backdrop-blur
            p-6
            mb-8
          "
        >
          <p className="text-zinc-400 text-sm">
            PROSSIMO APPUNTAMENTO
          </p>

          {nextAppointment ? (
            <>
              <h2 className="text-3xl font-bold mt-3">
                {nextAppointment.emoji}{" "}
                {nextAppointment.title}
              </h2>

              <p className="text-zinc-400 mt-3">
                📅 {nextAppointment.date}
              </p>

              {nextAppointment.location && (
                <p className="text-zinc-400">
                  📍 {nextAppointment.location}
                </p>
              )}

              <p className="text-pink-400 text-lg mt-4">
                ⏳ {countdownText}
              </p>
            </>
          ) : (
            <p className="text-zinc-400 mt-4">
              Nessun appuntamento programmato
            </p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">
          📅 I nostri appuntamenti
        </h2>

        <div className="grid gap-4 mb-10">

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

        <MemoriesSection />

      </div>

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