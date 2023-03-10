/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAccessToken,
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function createUser(req: NextApiRequest, res: NextApiResponse) { 
    const { accesToken } = await getAccessToken(req, res) as any;
    const { user } = getSession(req, res) as any;
    const { email, nickname, sub } = user;
    const baseUrl = process.env.API_BASE_URL;

    try {
        const response = await fetch(`${baseUrl}user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accesToken}`
            },
            body: JSON.stringify({
                auth0_id: sub,
                handle: nickname,
                email: email
            }),
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error:any) {
        console.log(error)
       res.status(500).json(error.message); 
    }

})