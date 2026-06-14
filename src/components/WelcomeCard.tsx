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
        bg-zinc-900/60
        backdrop-blur
        p-6
        mb-8
      "
    >
      <h2 className="text-2xl font-bold">
        Benvenuta {name} ❤️
      </h2>

      <p className="text-zinc-400 mt-2">
        Questo spazio è dedicato a noi.
      </p>
    </div>
  );
}