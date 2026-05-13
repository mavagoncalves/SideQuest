import {
  BriefcaseBusiness,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const student = {
  name: 'Maya Andersson',
  title: 'Graphic Design Student',
  school: 'Kristianstad University',
  location: 'Kristianstad, Sweden',
  rating: '4.9',
  completedQuests: 18,
  responseTime: 'Usually replies within 1 day',
  startingPrice: 'From 300 SEK',
  avatar: 'MA',
  bio: 'I help students, clubs, and small businesses create clean visual designs for social media, posters, presentations, and simple brand materials.',
}

const skills = [
  'Graphic Design',
  'Canva',
  'Social Media Posts',
  'Posters',
  'Presentations',
  'Branding',
]

const services = [
  {
    title: 'Social media post design',
    description: 'Custom Instagram or LinkedIn posts for events, clubs, and student projects.',
    price: '300 SEK',
  },
  {
    title: 'Poster or flyer design',
    description: 'A clean poster layout for campus events, small businesses, or personal projects.',
    price: '450 SEK',
  },
  {
    title: 'Presentation polish',
    description: 'Improve slides with better layout, colors, icons, and readable structure.',
    price: '350 SEK',
  },
]

// -----------Not sure about the reviews, but it is possible to add it to the profiles if we decide to do so later on
/*
const reviews = [
  {
    name: 'Jonas K.',
    text: 'Maya made our event poster look much more professional and delivered it quickly.',
  },
  {
    name: 'Sara L.',
    text: 'Easy to communicate with and very good at turning a rough idea into a clean design.',
  },
]
  */

const PublicProfile = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff7f4] text-slate-900">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 px-6 py-10 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-white text-3xl font-black text-orange-600 shadow-sm">
                {student.avatar}
              </div>

              <div>
                <p className="mb-2 w-fit rounded-full border border-white/60 px-4 py-1 text-sm font-bold">
                  Available for quest requests
                </p>
                <h1 className="text-4xl font-extrabold">{student.name}</h1>
                <p className="mt-2 text-lg font-semibold text-white/95">{student.title}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <GraduationCap size={17} />
                    {student.school}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={17} />
                    {student.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/50 bg-white/15 p-5 backdrop-blur-sm md:w-72">
              <p className="text-sm font-semibold text-white/85">Starting budget</p>
              <p className="mt-1 text-3xl font-extrabold">{student.startingPrice}</p>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-extrabold text-orange-600">
                <MessageCircle size={19} />
                Send Quest Request
              </button>
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>)
}

export default PublicProfile
