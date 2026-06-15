type Appointment = {
id: string;
title: string;
date: string;
location: string;
notes: string;
emoji: string;
favorite: boolean;
};

type Props = {
appointment: Appointment;
onDelete: (id: string) => void;
};

export default function AppointmentCard({
appointment,
onDelete,
}: Props) {
return ( <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 hover:border-pink-500/40 transition"> <div className="flex justify-between items-start"> <div> <h3 className="text-xl font-semibold">
{appointment.emoji} {appointment.title} </h3>

```
      <p className="text-zinc-400 mt-2">
        📅 {appointment.date}
      </p>

      {appointment.location && (
        <p className="text-zinc-400">
          📍 {appointment.location}
        </p>
      )}

      {appointment.notes && (
        <p className="text-zinc-500 mt-2">
          📝 {appointment.notes}
        </p>
      )}

      {appointment.favorite && (
        <p className="text-yellow-400 mt-2">
          ⭐ Preferito
        </p>
      )}
    </div>

    <button
      onClick={() => onDelete(appointment.id)}
      className="text-red-400 hover:text-red-300 text-xl"
    >
      🗑️
    </button>
  </div>
</div>

);
}
