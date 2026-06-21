export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 ">
      {/* backdrop-blur-sm */}
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
      </div>
    </div>
  );
}