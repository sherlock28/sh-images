const handleErrors = (error, request, response, next) => {
  console.error(error);
  console.log(error.name);

  if (error.name === "CastError") {
    response.status(400).json({ status: "Error", message: error.message });
  } else {
    response
      .status(500)
      .json({ status: "Error", message: "Internal server error" });
  }
};

module.exports = handleErrors;
