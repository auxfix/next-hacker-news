import { NextApiRequest } from 'next';
import { getBusHandlers } from '@/services/bus';


export default async function POST(req: NextApiRequest) {
    const [ producer ] = await getBusHandlers();
    const { msg } = req.body;


    return Response.json('ok');
}