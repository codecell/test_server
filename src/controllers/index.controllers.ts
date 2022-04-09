import { Response, Request } from "express"


export const indexResponse = async (req: Request, res: Response) => {
  const respo = await res.json('Welcome to Archymedes Server !!!')
  return respo;
}