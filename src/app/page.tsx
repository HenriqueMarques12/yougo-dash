import Link from 'next/link';

export default function Home() {
  return (
    <main id="home" className="font-hogfish">
      <div className="flex justify-center md:items-center py-5 min-h-screen ">
        <div className="flex flex-col space-y-4 items-center md:w-[30%] text-white px-4">
          <h1 className="text-center text-secondary">Olá!</h1>
          <article className="text-center text-secondary">
            Que prazer lhe ver por aqui.
          </article>
          <article className="text-center text-secondary">
            Acesse nosso site e confira todas as novidades que preparamos para você. Para acessar o site da YouGo clique no botão abaixo e continue nos acompanhando.
          </article>
          <Link
            href="https://yougoapp.com.br"
          >
            <h2  className="text-white bg-secondary hover:bg-bsecondary focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-secondary dark:hover:bg-secondary focus:outline-none dark:focus:ring-secondary">You Go</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
