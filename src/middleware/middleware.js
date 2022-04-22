const admin = true;

function onlyAdmin(req, res, next) {
  if (admin) next();
  else
    res
      .status(401)
      .json({
        error: `No tiene permisos para acceder al recurso [${req.method}] ${req.originalUrl}`,
      });
}

module.exports = onlyAdmin;
