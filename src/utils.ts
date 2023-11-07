/**
 * Decodes a JSON Web Token (JWT) and returns the payload object.
 * @param {string} jwt - The JWT string to be decoded.
 * @returns {Object} - The decoded payload object.
 */
export const decodeJWT = (jwt: string) => {
  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const decodedData = window.atob(base64);

  try {
    return JSON.parse(decodedData);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
  }
};
