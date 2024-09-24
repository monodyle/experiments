export default function UnderConstruction() {
  return (
    <div className="m-auto space-y-2 text-center animate-in slide-in-from-bottom-4 fade-in-0 duration-200">
      <div className="bg-[linear-gradient(45deg,transparent_25%,theme(colors.zinc.300)_25%,theme(colors.zinc.300)_50%,transparent_50%,transparent_75%,theme(colors.zinc.300)_75%)] bg-[size:32px_32px] animate-loading w-2/3 h-4 rounded-full bg-zinc-100 border border-zinc-300 mx-auto" />
      <h2 className="text-md font-bold uppercase select-none text-zinc-400 tracking-tight">Under Construction</h2>
    </div>
  )
}
