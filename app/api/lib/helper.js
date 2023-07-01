export const response = (status, message, data) => {
  return {
    status,
    message,
    data,
  };
};
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Set up the onload event handler
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      }
    };

    // Set up the onerror event handler
    reader.onerror = () => {
      reject(new Error("Failed to convert blob to base64."));
    };

    // Read the blob as a data URL
    reader.readAsDataURL(blob);
  });
}
