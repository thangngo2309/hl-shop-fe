export default function HomePage() {
  return (
    <div
      className="flex h-full min-h-80 flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 text-center sm:min-h-105 sm:px-6"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >

      <h1 className="mb-6 text-2xl font-bold text-white drop-shadow-sm sm:text-3xl md:text-4xl">
        Chào mừng đến với HL Shop!
      </h1>
    </div>
  );
}