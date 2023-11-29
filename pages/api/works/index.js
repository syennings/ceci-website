// import { works } from "@/public/data";

// export default function handler(request, response) {
//   response.status(200).json(works);
// }

import dbConnect from "@/db/connect";
import Work from "@/db/models/Work";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const works = await Work.find();
    return response.status(200).json(works);
  }
}
