import { prisma } from "../../prisma/prisma.js";

const profileInclude = {
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true
    }
  },
  skillTags: {
    include: {
      skillTag: true
    }
  }
};

const buildSkillTagConnections = (skillTags = []) => {
  const uniqueTags = [...new Set(skillTags.map((tag) => tag.trim()).filter(Boolean))];

  return uniqueTags.map((name) => ({
    skillTag: {
      connectOrCreate: {
        where: { name },
        create: { name }
      }
    }
  }));
};

const normalizeProfile = (profile) => ({
  ...profile,
  skillTags: profile.skillTags.map(({ skillTag }) => skillTag)
});

export const getAllProfiles = async () => {
  const profiles = await prisma.profile.findMany({
    orderBy: { updatedAt: "desc" },
    include: profileInclude
  });

  return profiles.map(normalizeProfile);
};

export const getProfileById = async (id) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: profileInclude
  });

  return profile ? normalizeProfile(profile) : null;
};

export const getProfileByUserId = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: profileInclude
  });

  return profile ? normalizeProfile(profile) : null;
};

export const createProfile = async (userId, profileData) => {
  const { skillTags, ...data } = profileData;

  const profile = await prisma.profile.create({
    data: {
      ...data,
      user: {
        connect: { id: userId }
      },
      skillTags: {
        create: buildSkillTagConnections(skillTags)
      }
    },
    include: profileInclude
  });

  return normalizeProfile(profile);
};

export const updateProfile = async (id, profileData) => {
  const { skillTags, ...data } = profileData;

  const profile = await prisma.$transaction(async (tx) => {
    if (Array.isArray(skillTags)) {
      await tx.profileSkillTag.deleteMany({
        where: { profileId: id }
      });
    }

    return tx.profile.update({
      where: { id },
      data: {
        ...data,
        ...(Array.isArray(skillTags)
          ? {
              skillTags: {
                create: buildSkillTagConnections(skillTags)
              }
            }
          : {})
      },
      include: profileInclude
    });
  });

  return normalizeProfile(profile);
};
