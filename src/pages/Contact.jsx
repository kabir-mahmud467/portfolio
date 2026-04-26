export default function Contact() {
  return (
    <div className="max-w-xl mx-auto space-y-8 py-10">
      <p className="text-center opacity-70">TYPE YOUR MESSAGE TO THE NEBULA</p>
      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs">USER_ID:</label>
          <input className="bg-transparent border border-green-900/50 p-2 focus:outline-none focus:border-green-400" placeholder="guest@earth.local" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">SIGNAL_PAYLOAD:</label>
          <textarea rows="4" className="bg-transparent border border-green-900/50 p-2 focus:outline-none focus:border-green-400" placeholder="Type your message..." />
        </div>
        <button className="w-full border border-green-400 py-2 hover:bg-green-400 hover:text-black transition-all font-bold">
          EXECUTE: SEND_SIGNAL
        </button>
      </form>
    </div>
  );
}