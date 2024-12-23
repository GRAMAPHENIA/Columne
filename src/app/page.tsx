import KanbanBoard from "@/components/kanbanBoard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main >
       <KanbanBoard/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Aprender
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Ejemplos
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Ir a hexagono.xyz →
        </a>
      </footer>
    </div>
  );
}
