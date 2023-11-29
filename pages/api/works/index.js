import { works } from "@/public/data";

export default function handler(request, response) {
  response.status(200).json(works);
}
