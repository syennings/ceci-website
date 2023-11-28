import { works } from "../../../lib/data.js";

export default function handler(request, response) {
  console.log("request: ", request.query);
  const { id } = request.query;
  console.log("id: ", id);
  const work = works.find((work) => work.id === id);

  if (!work) {
    return response.status(404).json({ status: "Not Found" });
  }

  response.status(200).json(work);
}
