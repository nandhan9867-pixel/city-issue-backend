const issueModel = require("../models/issueModel");

const createIssue = async (data) => {
  return await issueModel.createIssue(data);
};

const getMyIssues = async (userId) => {
  return await issueModel.getMyIssues(userId);
};

const getAllIssues = async () => {
  return await issueModel.getAllIssues();
};

const addIssueImage = async (
  issueId,
  imageUrl
) => {

  return await issueModel.addIssueImage(
    issueId,
    imageUrl
  );

};

const getIssueById = async (id) => {
  return await issueModel.getIssueById(id);
};

const updateIssueStatus = async (
  issueId,
  status,
  remarks
) => {

  return await issueModel.updateIssueStatus(
    issueId,
    status,
    remarks
  );
};


const deleteIssue =
async (id)=>{
  return await issueModel.deleteIssue(id);
};

module.exports = {
  createIssue,
  getMyIssues,
  getAllIssues,
  addIssueImage,
  getIssueById,
  updateIssueStatus,
  deleteIssue
};