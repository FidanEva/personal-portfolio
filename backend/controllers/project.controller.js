const Project = require("../models/project.schema");
const signedUrl = require("../utils/cloudinarySignedUrl");
const { success, error } = require("../utils/response");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().lean();

    const enhanced = projects.map((p) => ({
      ...p,
      images: (p.images || []).map((img) => ({
        ...img,
        url: signedUrl(img.public_id, img.format, img.resource_type),
      })),
      video: p.video
        ? {
            ...p.video,
            url: signedUrl(
              p.video.public_id,
              p.video.format,
              p.video.resource_type
            ),
          }
        : null,
    }));

    return success(res, 200, "Projects fetched successfully", enhanced);

  } catch (err) {
    console.error("Get projects error:", err);
    return error(res, 500, "Failed to fetch projects", err.message);
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).lean();
    if (!project) {
      return error(res, 404, "Project not found");
    }

    const enhanced = {
      ...project,
      images: (project.images || []).map((img) => ({
        ...img,
        url: signedUrl(img.public_id, img.format, img.resource_type),
      })),
      video: project.video
        ? {
            ...project.video,
            url: signedUrl(
              project.video.public_id,
              project.video.format,
              project.video.resource_type
            ),
          }
        : null,
    };

    return success(res, 200, "Project fetched successfully", enhanced);

  } catch (err) {
    return error(res, 500, "Failed to fetch project", err.message);
  }
};

const createProject = async (req, res) => {
  try {
    const images =
      req.files?.images?.map((file) => ({
        public_id: file.filename,
        format: file.format,
        resource_type: file.resource_type,
        folder: file.folder,
      })) || [];

    const video = req.files?.video?.[0]
      ? {
          public_id: req.files.video[0].filename,
          format: req.files.video[0].format,
          resource_type: req.files.video[0].resource_type,
          folder: req.files.video[0].folder,
        }
      : null;

    const newProject = await Project.create({
      ...req.body,
      images,
      video,
    });

    return success(res, 201, "Project created successfully", newProject);

  } catch (err) {
    return error(res, 500, "Failed to create project", err.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Project.findById(id);
    if (!existing) {
      return error(res, 404, "Project not found");
    }

    const newImages =
      req.files?.images?.map((file) => ({
        public_id: file.filename,
        format: file.format,
        resource_type: file.resource_type,
        folder: file.folder,
      })) || [];

    const newVideo = req.files?.video?.[0]
      ? {
          public_id: req.files.video[0].filename,
          format: req.files.video[0].format,
          resource_type: req.files.video[0].resource_type,
          folder: req.files.video[0].folder,
        }
      : null;

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: [...existing.images, ...newImages],
        video: newVideo || existing.video,
      },
      { new: true }
    );

    return success(res, 200, "Project updated successfully", updated);

  } catch (err) {
    return error(res, 500, "Failed to update project", err.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return error(res, 404, "Project not found");
    }

    return success(res, 200, "Project deleted successfully");

  } catch (err) {
    return error(res, 500, "Failed to delete project", err.message);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
