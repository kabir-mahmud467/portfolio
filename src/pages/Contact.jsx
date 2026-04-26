export default function Contact() {
  return (
    <div className="max-w-xl mx-auto space-y-6 sm:space-y-8 py-8 sm:py-10">
      <p className="text-center text-xs sm:text-sm tracking-wide opacity-70">TYPE YOUR MESSAGE TO THE NEBULA</p>
      <form className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-md terminal-glow">
        <div className="flex flex-col gap-2">
          <label className="text-xs">USER_ID:</label>
          <input className="rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-bioCyan/50 focus:ring-2 focus:ring-bioCyan/15" placeholder="guest@earth.local" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">SIGNAL_PAYLOAD:</label>
          <textarea rows="4" className="rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-bioCyan/50 focus:ring-2 focus:ring-bioCyan/15" placeholder="Type your message..." />
        </div>
        <button type="submit" className="w-full rounded-2xl border border-bioCyan/30 bg-bioCyan/10 px-4 py-3 text-xs font-bold tracking-[0.2em] text-bioCyan hover:bg-bioCyan/15 transition-colors">
          EXECUTE: SEND_SIGNAL
        </button>
      </form>
    </div>
  );
}
