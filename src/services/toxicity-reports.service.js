import { ResponseError } from "../models/ResponseError";

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const generateReport = async ({
  token,
  reportedElementId,
  tags,
  type = "post",
}) => {
  const response = await fetch(`${BASE_URL}/toxicity-reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tags, type, reportedElementId }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError(`The ${type} has already been deleted`, 404);
    }

    if (response.status === 409) {
      throw new ResponseError(
        `This ${type} is already reported`,
        response.status
      );
    }

    throw new ResponseError(`Error reporting ${type}`, response.status);
  }

  return true;
};
