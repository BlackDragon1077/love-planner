import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../calendar.css";

import { db } from "../firebase";
import {
collection,
onSnapshot,
} from "firebase/firestore";

type EventDay = {
  date: string;
  title: string;
  type: "appointment" | "memory";
};

export default function LoveCalendar() {
const [events, setEvents] = useState<EventDay[]>([]);
const [selectedDate, setSelectedDate] =
useState<string | null>(null);

useEffect(() => {
const unsubscribeAppointments =
onSnapshot(
collection(db, "appointments"),
(snapshot) => {
const appointments: EventDay[] =
  snapshot.docs.map((doc) => ({
    date: doc.data().date || "",
    title: doc.data().title || "",
    type: "appointment",
  }));


      setEvents((prev) => [
        ...prev.filter(
          (e) =>
            e.type !== "appointment"
        ),
        ...appointments,
      ]);
    }
  );

const unsubscribeMemories =
  onSnapshot(
    collection(db, "memories"),
    (snapshot) => {
     const memories: EventDay[] =
  snapshot.docs.map((doc) => ({
    date: doc.data().date || "",
    title: doc.data().title || "",
    type: "memory",
  }));

      setEvents((prev) => [
        ...prev.filter(
          (e) => e.type !== "memory"
        ),
        ...memories,
      ]);
    }
  );

return () => {
  unsubscribeAppointments();
  unsubscribeMemories();
};


}, []);

const selectedEvents =
selectedDate
? events.filter(
(e) => e.date === selectedDate
)
: [];

return ( <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-6 mb-10"> <h2 className="text-2xl font-bold mb-4">
📅 Calendario dell'Amore </h2>


  <Calendar
    className="w-full border-0 bg-transparent"
    onClickDay={(date) =>
  setSelectedDate(
    `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`
  )
}
    tileContent={({ date }) => {
      const day =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

      const hasAppointment =
        events.some(
          (e) =>
            e.date === day &&
            e.type === "appointment"
        );

      const hasMemory =
        events.some(
          (e) =>
            e.date === day &&
            e.type === "memory"
        );

      if (
        !hasAppointment &&
        !hasMemory
      ) {
        return null;
      }

      return (
        <div className="flex justify-center gap-1 mt-1">
          {hasMemory && (
            <div className="w-2 h-2 rounded-full bg-pink-500" />
          )}

          {hasAppointment && (
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          )}
        </div>
      );
    }}
  />

  {selectedDate && (
    <div className="mt-6 border-t border-zinc-800 pt-6">
      <h3 className="font-bold text-lg mb-3">
        ❤️ {selectedDate}
      </h3>

      {selectedEvents.length === 0 ? (
        <p className="text-zinc-500">
          Nessun evento
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {selectedEvents.map(
            (event, index) => (
              <div
                key={index}
                className="
                  rounded-xl
                  bg-zinc-800
                  px-4
                  py-3
                "
              >
<div className="flex items-center gap-2">
  <span>
    {event.type === "appointment"
      ? "📅"
      : "❤️"}
  </span>

  <span className="font-medium">
    {event.title}
  </span>
</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )}
</div>

);
}
