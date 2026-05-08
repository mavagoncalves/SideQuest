import { GraduationCap } from "lucide-react"

function SignupPage() {
  return (
    <main className="min-h-screen bg-[#fff7f4] font-sans text-slate-900">
      <header className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-6">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-extrabold text-white">
          <GraduationCap size={24} />
        </div>
        <h1 className="m-0 text-3xl font-extrabold text-orange-600">
          SideQuest
        </h1>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-10 text-center text-white">
        <p className="mx-auto mb-4 w-fit rounded-full border border-white/60 px-4 py-1.5 text-sm font-bold">
          For students, by students
        </p>
        <h2 className="m-0 text-4xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-3 text-white">
          Sign up and start finding student projects.
        </p>
      </section>

      <section className="mx-auto my-9 w-[min(430px,calc(100%-32px))] rounded-xl border-2 border-orange-200 bg-white p-6 text-left">
        <h3 className="m-0 text-2xl font-bold">Sign Up</h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details below.
        </p>

        
        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a className="font-extrabold text-orange-600 no-underline" href="/login">
            Login
          </a>
        </p>
      </section>
    </main>
  )
}

export default SignupPage
