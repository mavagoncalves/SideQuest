import React, { useState } from 'react'
import { Star, BriefcaseBusiness, Clock, Mail, X } from 'lucide-react';
import toast from 'react-hot-toast';

const SidebarProfile = ({ 
    userProfile, 
    setUserProfile,
    isOwner,
    isEditing
}) => {
    const [tagInput, setTagInput] = useState('')

    const TAG_COLORS = [
        'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
        'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
        'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
        'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    ];

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const trimmedValue = tagInput.trim();

            if (trimmedValue) {
                if (userProfile.skills.includes(trimmedValue)) {
                    toast.error("Skill has already been added.");
                    return;
                }

                setUserProfile(prev => ({
                    ...prev,
                    skills: [...prev.skills, trimmedValue]
                }));
                setTagInput(''); 
            }
        }
    };

    const removeSkillTag = (indexToRemove) => {
        setUserProfile(prev => ({
            ...prev,
            skills: prev.skills.filter((_, index) => index !== indexToRemove)
        }));
    };
    
    return (
        <aside className="space-y-6">
            {/* skill tags */}
            <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Skills</h2>
                
                {/* Show text input only when editing is active */}
                {isEditing && (
                    <div className="mt-3">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-orange-50/50 border border-orange-200 rounded-lg p-2.5 outline-none focus:border-orange-400 placeholder:text-slate-400 text-xs"
                            placeholder="Type a skill and press Enter..."
                        />
                    </div>
                )}

                {/* bubble container */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {userProfile.skills && userProfile.skills.length > 0 ? (
                        userProfile.skills.map((skill, index) => {
                            // picks a color from array based on the tags number position 
                            const colorClass = TAG_COLORS[index % TAG_COLORS.length];

                            return (
                                <span 
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold shadow-xs transition-all ${colorClass}`} 
                                    key={index}
                                >
                                    {skill}
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeSkillTag(index)}
                                            className="hover:bg-black/5 rounded-full p-0.5 transition-colors flex items-center justify-center text-slate-500"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </span>
                            );
                        })
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

export default SidebarProfile;