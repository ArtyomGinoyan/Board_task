import { moveCardForService } from "../types/cardTypes";

const moveCardService = async (form: moveCardForService): Promise<Response> => {
  const response = await fetch(`http://localhost:3303/card/moved`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
    }),
  });
  return response;
};

export default moveCardService;
