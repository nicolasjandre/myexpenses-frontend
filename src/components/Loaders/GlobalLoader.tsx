export function GlobalLoader() {
  return (
    <div className="flex items-center justify-center w-screen h-[85vh]">
      <div
        className="animate-spin inline-block w-[5vw] h-[5vw]
           border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
