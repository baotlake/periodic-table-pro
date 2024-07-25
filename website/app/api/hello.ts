// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {} from 'next'

type Data = {
  name: string
}

export default function GET(req: Request) {
  return Response.json({ name: 'HuanYang' })
}
