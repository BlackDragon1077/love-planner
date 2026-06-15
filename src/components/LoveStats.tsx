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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

      <div
        className="
          rounded-3xl
          bg-zinc-900/70
          backdrop-blur-xl
          border
          border-zinc-800
          p-5
        "
      >
        <p className="text-zinc-500 text-xs tracking-wider">
          GIORNI INSIEME
        </p>

        <h3 className="text-2xl md:text-3xl font-bold mt-2">
          💖 {daysTogether}
        </h3>
      </div>

      <div
        className="
          rounded-3xl
          bg-zinc-900/70
          backdrop-blur-xl
          border
          border-zinc-800
          p-5
        "
      >
        <p className="text-zinc-500 text-xs tracking-wider">
          APPUNTAMENTI
        </p>

        <h3 className="text-2xl md:text-3xl font-bold mt-2">
          📅 {appointmentsCount}
        </h3>
      </div>

      <div
        className="
          rounded-3xl
          bg-zinc-900/70
          backdrop-blur-xl
          border
          border-pink-500/20
          p-5
        "
      >
        <p className="text-zinc-500 text-xs tracking-wider">
          COUNTDOWN
        </p>

        <h3
          className="
            text-base
            md:text-lg
            font-bold
            mt-2
            text-pink-400
            break-words
          "
        >
          ⏳ {countdownText || "--"}
        </h3>
      </div>

    </div>
  );
}