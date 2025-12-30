exports.success = (res, status, message, data = null) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

exports.error = (res, status, message, error = null) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    error,
  });
};
