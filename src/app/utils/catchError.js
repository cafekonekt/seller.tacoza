export function catchError(promise, errorsToCatch = [400, 401, 403, 404, 500]) {
  return promise
    .then((response) => {
      return [undefined, response];
    })
    .catch((error) => {
      console.error("Caught error:", error);
      if (errorsToCatch.includes(error.status)) {
        return [error, undefined];
      }
      throw error;
    });
}
