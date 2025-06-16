exports.success = (res, message, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  exports.error = (res, statusCode = 500, message = 'Something went wrong') => {
    return res.status(statusCode).json({
      success: false,
      message
    });
  };
  