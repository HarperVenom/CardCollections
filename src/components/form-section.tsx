export default function FormSection({
  children,
  name,
  inputId,
}: {
  children: React.ReactNode;
  name: string;
  inputId?: string;
}) {
  return (
    <div
      className="rounded-lg border-2 border-zinc-400
         w-full p-4 py-10 flex flex-col items-center 
         justify-center m-1 mt-6 relative"
    >
      <div className="w-full max-w-[300px] flex flex-col items-center">
        <label
          className="font-bold text-center text-2xl absolute 
        top-0 -translate-y-2/3 bg-zinc-300 px-2 text-zinc-500 self-start"
          htmlFor={inputId}
        >
          {name}
        </label>
        {children}
      </div>
    </div>
  );
}
