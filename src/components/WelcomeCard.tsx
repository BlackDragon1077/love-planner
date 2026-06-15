type Props = {
  name: string;
};

export default function WelcomeCard({
  name,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        p-5
        md:p-6
        mb-6
      "
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-pink-500
            to-violet-500
            flex
            items-center
            justify-center
            text-xl
          "
        >
          ❤️
        </div>

        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            Love Planner
          </p>

          <h2 className="text-xl md:text-2xl font-bold">
            Benvenuta {name}
          </h2>
        </div>
      </div>

      <p className="text-zinc-400 text-sm md:text-base">
        Questo spazio è dedicato a noi.
      </p>
    </div>
  );
}