import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {BriefcaseBusiness, Clock, GraduationCap, Mail, MapPin, MessageCircle, Star, Settings, Check, X} from 'lucide-react'
import toast from 'react-hot-toast'
import apiClient from '../api/axiosClient'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PublicProfile = () => {
    const { id } = useParams() 
    
    const [isLoading, setIsLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    
    const [profileDbId, setProfileDbId] = useState(null) 
    const [loggedInUser, setLoggedInUser] = useState(null)

    const [userProfile, setUserProfile] = useState({
        firstName: '', lastName: '', title: '', school: '', location: '',
        rating: '0.0', completedQuests: 0, responseTime: 'Not set',
        startingPrice: 0, bio: '', skills: [], services: []
    })
    
    const [originalData, setOriginalData] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true)
                
                const userFromStorage = JSON.parse(localStorage.getItem('user'))
                setLoggedInUser(userFromStorage)
                
                const targetUserId = id || userFromStorage?.id
                
                if (!targetUserId) {
                    setIsLoading(false)
                    return 
                }

                const ownerCheck = userFromStorage && targetUserId === userFromStorage.id
                setIsOwner(ownerCheck)

                const response = await apiClient.get(`/profiles/user/${targetUserId}`)
                const dbProfile = response.data
                
                setProfileDbId(dbProfile.id) 
                
                const loadedData = {
                    firstName: ownerCheck ? userFromStorage.firstName : (dbProfile.user?.firstName || ''),
                    lastName: ownerCheck ? userFromStorage.lastName : (dbProfile.user?.lastName || ''),
                    title: dbProfile.headline || '',
                    location: dbProfile.location || '',
                    startingPrice: dbProfile.hourlyRateCents ? dbProfile.hourlyRateCents / 100 : 0,
                    bio: dbProfile.bio || '',
                    skills: dbProfile.skillTags || [],
                    
                    school: '', 
                    rating: '0.0', 
                    completedQuests: 0, 
                    responseTime: 'Not set', 
                    services: [] 
                }

                setUserProfile(loadedData)
                setOriginalData(loadedData)

            } catch (error) {
                if (error.response?.status === 404) {
                    const userFromStorage = JSON.parse(localStorage.getItem('user'))
                    if (userFromStorage && (!id || id === userFromStorage.id)) {
                        setUserProfile(prev => ({
                            ...prev,
                            firstName: userFromStorage.firstName || '',
                            lastName: userFromStorage.lastName || ''
                        }))
                    }
                } else {
                    toast.error("Error loading profile data")
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            const payload = {
                headline: userProfile.title,
                location: userProfile.location,
                hourlyRateCents: Number(userProfile.startingPrice) * 100,
                bio: userProfile.bio
            }

            if (profileDbId) {
                await apiClient.put(`/profiles/${profileDbId}`, payload)
                toast.success("Profile updated!")
            } else {
                const response = await apiClient.post(`/profiles`, {
                    ...payload,
                    userId: loggedInUser.id
                })
                setProfileDbId(response.data.id) 
                toast.success("Profile created!")
            }
            
            setOriginalData(userProfile)
            setIsEditing(false)
        } catch (error) {
            console.error("Save error:", error)
            toast.error(error.response?.data?.error || "Failed to save profile")
        }
    }

    const handleCancel = () => {
        setUserProfile(originalData)
        setIsEditing(false)
    }

    const avatarLetters = (userProfile.firstName || userProfile.lastName) 
        ? `${userProfile.firstName?.charAt(0) || ''}${userProfile.lastName?.charAt(0) || ''}`.toUpperCase() 
        : 'SQ'

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center bg-[#fff7f4]">Loading...</div>
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#fff7f4] text-slate-900">
            <Navbar />

            <main className="flex-1">
                <section className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 px-6 py-10 text-white">
                    
                    {isOwner && !isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="absolute top-4 right-4 md:right-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full font-bold transition-all shadow-sm"
                        >
                            <Settings size={18} />
                        </button>
                    )}

                    <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-white text-3xl font-black text-orange-600 shadow-sm">
                                {avatarLetters}
                            </div>

                            <div>
                                <h1 className="text-4xl font-extrabold">{userProfile.firstName} {userProfile.lastName}</h1>
                                
                                {isEditing ? (
                                    <input 
                                        name="title" value={userProfile.title} onChange={handleChange} 
                                        className="mt-2 text-lg font-semibold bg-transparent border-b border-dashed border-white/60 outline-none w-64 focus:border-solid placeholder:text-white/70"
                                        placeholder="Add a headline (e.g. Graphic Designer)"
                                    />
                                ) : (
                                    <p className="mt-2 text-lg font-semibold text-white/95">{userProfile.title || "No headline set"}</p>
                                )}
                                
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/90">
                                    <span className="flex items-center gap-2">
                                        <GraduationCap size={17} />
                                        {userProfile.school || "Institution not set"}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={17} />
                                        {isEditing ? (
                                            <input 
                                                name="location" value={userProfile.location} onChange={handleChange} 
                                                className="bg-transparent border-b border-dashed border-white/60 outline-none focus:border-solid placeholder:text-white/70" 
                                                placeholder="City, Country"
                                            />
                                        ) : (
                                            userProfile.location || "Location not set"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/50 bg-white/15 p-5 backdrop-blur-sm md:w-60 md:mr-12">
                            <p className="text-sm font-semibold text-white/85">Starting budget</p>
                            
                            {isEditing ? (
                                <div className="mt-1 flex items-center text-3xl font-extrabold">
                                    <span className="text-xl mr-2">From</span>
                                    <input 
                                        name="startingPrice" type="number" value={userProfile.startingPrice} onChange={handleChange} 
                                        className="bg-transparent border-b border-dashed border-white/60 outline-none w-20 focus:border-solid" 
                                    />
                                    <span className="ml-2">SEK</span>
                                </div>
                            ) : (
                                <p className="mt-1 text-3xl font-extrabold">From {userProfile.startingPrice} SEK</p>
                            )}

                            {!isOwner && (
                                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-extrabold text-orange-600">
                                    <MessageCircle size={19} />
                                    Send SideQuest Request
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 py-8">
                    <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">About</h2>
                        {isEditing ? (
                            <textarea 
                                name="bio" value={userProfile.bio} onChange={handleChange} 
                                className="mt-3 w-full bg-orange-50/50 border border-dashed border-orange-300 rounded-lg p-3 outline-none focus:border-solid focus:ring-1 focus:ring-orange-400 min-h-[120px] text-slate-600 leading-7 placeholder:text-slate-400" 
                                placeholder="Tell clients about your skills and experience..."
                            />
                        ) : (
                            <p className="mt-3 leading-7 text-slate-600">{userProfile.bio || "This user hasn't written a bio yet."}</p>
                        )}
                    </div>

                    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
                        <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold">Services</h2>
                            <div className="mt-5 grid gap-4">
                                {userProfile.services.length > 0 ? (
                                    userProfile.services.map((service, index) => (
                                        <article className="rounded-lg border border-orange-100 bg-orange-50/40 p-5" key={index}>
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold">{service.title}</h3>
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                                                </div>
                                                <p className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-pink-600">
                                                    {service.price}
                                                </p>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No services listed yet.</p>
                                )}
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold">Skills</h2>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {userProfile.skills.length > 0 ? (
                                        userProfile.skills.map((skill, index) => (
                                            <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700" key={index}>
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 italic">No skills added yet.</p>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold">Profile Info</h2>
                                <div className="mt-5 space-y-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Star className="text-orange-500" size={18} />
                                        <span><strong>{userProfile.rating}</strong> rating from clients</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BriefcaseBusiness className="text-orange-500" size={18} />
                                        <span><strong>{userProfile.completedQuests}</strong> completed quests</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="text-orange-500" size={18} />
                                        <span>{userProfile.responseTime}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-orange-500" size={18} />
                                        <span>Contact through SideQuest</span>
                                    </div>
                                </div>
                            </div>

                            {!isOwner && (
                                <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-xl font-bold">SideQuest Request</h2>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Send a custom request with your project details, deadline, and budget.
                                        The user can accept or decline it.
                                    </p>
                                    <button className="mt-5 w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-extrabold text-white">
                                        Send SideQuest request
                                    </button>
                                </div>
                            )}
                        </aside>
                    </div>

                    <div>
                        {isOwner && isEditing && (
                        <div className="flex items-center gap-2 md:ml-110 md:mt-7">
                            <button onClick={handleCancel} className="flex items-center gap-1 bg-white hover:bg-orange-50 px-4 py-2 rounded-full font-bold shadow-lg transition-all">
                                <X size={18} /> Cancel
                            </button>
                            <button onClick={handleSave} className="flex items-center gap-1 bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full font-bold shadow-lg transition-all">
                                <Check size={18} /> Save Changes
                            </button>
                        </div>
                    )}
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}

export default PublicProfile