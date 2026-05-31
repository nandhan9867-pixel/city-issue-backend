const issueService =
require("../services/issueService");

const createIssue = async (req, res) => {
  try {

    const result =
    await issueService.createIssue({
      ...req.body,
      user_id: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Issue Created Successfully",
      issueId: result.insertId
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getMyIssues = async (req, res) => {
  try {

    const issues =
    await issueService.getMyIssues(
      req.user.id
    );

    res.json({
      success: true,
      data: issues
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getAllIssues = async (req, res) => {
  try {

    const issues =
    await issueService.getAllIssues();

    res.json({
      success: true,
      data: issues
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const uploadIssueImage =
async (req, res) => {

  try {

    const issueId =
    req.params.issueId;

    if (!req.file) {
      return res.status(400).json({
        success:false,
        message:"Image Required"
      });
    }

    const imagePath =
    req.file.filename;

    await issueService.addIssueImage(
      issueId,
      imagePath
    );

    res.json({
      success:true,
      message:
      "Image Uploaded Successfully",
      image:imagePath
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

  };

  const getIssueById = async (req, res) => {

  try {

    const issue =
    await issueService.getIssueById(
      req.params.id
    );

    res.json({
      success: true,
      data: issue
    });

  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

const updateIssueStatus =
async (req,res)=>{

  try{

    await issueService.updateIssueStatus(
      req.params.id,
      req.body.status,
      req.body.remarks
    );

    res.json({
      success:true,
      message:"Status Updated"
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
  };

  const deleteIssue =
async(req,res)=>{

  try{

    await issueService.deleteIssue(
      req.params.id
    );

    res.json({
      success:true,
      message:"Issue Deleted"
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

module.exports = {
  createIssue,
  getMyIssues,
  getAllIssues,
  uploadIssueImage,
  getIssueById,
  updateIssueStatus,
  deleteIssue
};