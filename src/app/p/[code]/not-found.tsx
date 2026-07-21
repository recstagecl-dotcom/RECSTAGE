export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-black text-[#E50914] tracking-tighter mb-4">
          404
        </h1>
        <p className="text-neutral-400 text-lg font-light mb-8">
          Esta propuesta no existe o no está disponible.
        </p>
        <div className="w-16 h-px bg-neutral-800 mx-auto" />
      </div>
    </div>
  );
}
