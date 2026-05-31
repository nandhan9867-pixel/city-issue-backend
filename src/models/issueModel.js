const db = require("../config/db");

const createIssue = async (issueData) => {
  const {
    user_id,
    category_id,
    title,
    description,
    location_address,
    latitude,
    longitude,
    priority
  } = issueData;

  const [result] = await db.query(
    `
    INSERT INTO issues
    (
      user_id,
      category_id,
      title,
      description,
      location_address,
      latitude,
      longitude,
      priority
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_id,
      category_id,
      title,
      description,
      location_address,
      latitude,
      longitude,
      priority
    ]
  );

  return result;
};

const getMyIssues = async (userId) => {

  const [rows] = await db.query(
    `
    SELECT
      i.*,
      img.image_url
    FROM issues i
    LEFT JOIN issue_images img
      ON img.issue_id = i.id
    WHERE i.user_id = ?
    ORDER BY i.id DESC
    `,
    [userId]
  );

  return rows;
};

const getAllIssues = async () => {
  const [rows] = await db.query(
    `
    SELECT
      i.*,
      u.name,
      u.email,
      c.name AS category_name
    FROM issues i
    JOIN users u
      ON i.user_id = u.id
    JOIN categories c
      ON i.category_id = c.id
    ORDER BY i.id DESC
    `
  );

  return rows;
};

const addIssueImage = async (
  issueId,
  imageUrl
) => {

  const [result] =
  await db.query(
    `
    INSERT INTO issue_images
    (
      issue_id,
      image_url
    )
    VALUES (?, ?)
    `,
    [
      issueId,
      imageUrl
    ]
  );

  return result;
};

const getIssueById = async (issueId) => {

  const [rows] = await db.query(
    `
    SELECT
      i.*,
      u.name,
      u.email,
      c.name AS category_name,
      img.image_url
    FROM issues i
    JOIN users u
      ON i.user_id = u.id
    JOIN categories c
      ON i.category_id = c.id
    LEFT JOIN issue_images img
      ON img.issue_id = i.id
    WHERE i.id = ?
    `,
    [issueId]
  );

  return rows[0];
};

const updateIssueStatus = async (
  issueId,
  status,
  remarks
) => {

  const [result] = await db.query(
    `
    UPDATE issues
    SET
      status = ?,
      admin_remarks = ?
    WHERE id = ?
    `,
    [
      status,
      remarks,
      issueId
    ]
  );

  return result;
};

const deleteIssue = async (id) => {

  const [result] =
  await db.query(
    "DELETE FROM issues WHERE id=?",
    [id]
  );

  return result;
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

