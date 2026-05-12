const {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  updateProfile
} = require("../models/profile.model");

const allowedProfileFields = [
  "headline",
  "bio",
  "location",
  "hourlyRateCents",
  "avatarUrl",
  "availability",
  "skillTags"
];

const pickProfileData = (body) =>
  allowedProfileFields.reduce((data, field) => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }

    return data;
  }, {});

const validateProfileData = (data) => {
  if (data.hourlyRateCents !== undefined && !Number.isInteger(data.hourlyRateCents)) {
    return "hourlyRateCents must be an integer";
  }

  if (data.skillTags !== undefined && !Array.isArray(data.skillTags)) {
    return "skillTags must be an array of strings";
  }

  if (
    Array.isArray(data.skillTags) &&
    data.skillTags.some((tag) => typeof tag !== "string")
  ) {
    return "skillTags must only contain strings";
  }

  return null;
};

const handleProfileError = (error, res, next) => {
  if (error.code === "P2002" && error.meta?.target?.includes("userId")) {
    res.status(409).json({ error: "Profile already exists for this user" });
    return;
  }

  if (error.code === "P2003") {
    res.status(404).json({ error: "User not found" });
    return;
  }

  if (error.code === "P2025") {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  next(error);
};

const listProfiles = async (_req, res, next) => {
  try {
    const profiles = await getAllProfiles();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

const fetchProfileById = async (req, res, next) => {
  try {
    const profile = await getProfileById(req.params.id);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const fetchProfileByUserId = async (req, res, next) => {
  try {
    const profile = await getProfileByUserId(req.params.userId);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const createUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const profileData = pickProfileData(req.body);
    const validationError = validateProfileData(profileData);

    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    const profile = await createProfile(userId, profileData);
    res.status(201).json(profile);
  } catch (error) {
    handleProfileError(error, res, next);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const profileData = pickProfileData(req.body);
    const validationError = validateProfileData(profileData);

    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    const profile = await updateProfile(req.params.id, profileData);
    res.json(profile);
  } catch (error) {
    handleProfileError(error, res, next);
  }
};

module.exports = {
  createUserProfile,
  fetchProfileById,
  fetchProfileByUserId,
  listProfiles,
  updateUserProfile
};
