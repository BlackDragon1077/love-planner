type Props = {
  daysTogether: number;
  appointmentsCount: number;
  countdownText: string;
};

export default function LoveStats({
  daysTogether,
  appointmentsCount,
  countdownText,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
        <p className="text-zinc-500 text-sm">
          GIORNI INSIEME
        </p>

        <h3 className="text-3xl font-bold mt-2">
          💖 {daysTogether}
        </h3>
      </div>

      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
        <p className="text-zinc-500 text-sm">
          APPUNTAMENTI
        </p>

        <h3 className="text-3xl font-bold mt-2">
          📅 {appointmentsCount}
        </h3>
      </div>

      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
        <p className="text-zinc-500 text-sm">
          COUNTDOWN
        </p>

        <h3 className="text-lg font-bold mt-2 text-pink-400">
          {countdownText || "--"}
        </h3>
      </div>

    </div>
  );
}