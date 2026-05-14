import React from 'react'
import { BriefcaseBusiness, Clock, Mail, MessageCircle, Star } from 'lucide-react'

const SidebarProfile = ({ userProfile, isOwner }) => {
    return (
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
    )
}

export default SidebarProfile