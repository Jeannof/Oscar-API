// Error de negocio con código HTTP asociado.
// Los servicios lo lanzan sin conocer req/res; el controlador usa error.status.
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

module.exports = AppError;
