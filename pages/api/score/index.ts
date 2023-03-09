import {
    getAccessToken,
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function Score(req: NextApiRequest, res: NextApiResponse) {
    const { accesToken } = await getAccessToken(req, res) as any;
    const { user } = getSession(req, res) as any;
    const { sub } = user;
    const { score } = req.body;
    const baseUrl = 'http://localhost:8000/'

    if (req.method === 'POST') {
        try {
            const response = await fetch(`${baseUrl}score/${sub}`, {
                headers: {
                    'authorization': `Bearer ${accesToken}`,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            const lastScore = data?.points

            if (score > lastScore) { 
                try {
                    const response = await fetch(`${baseUrl}score/edit`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accesToken}`,
                        },
                        body: JSON.stringify({
                            auth0_id: sub,
                            points: score
                        }),
                    })
                    const data = await response.json();
                    res.status(200).json(data);
                }
                catch (error: any) { 
                    console.error(error)
                    res.status(500).json(error.message);
                }

            } else {
                const response = await fetch(`${baseUrl}score`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${accesToken}`,
                    },
                    body: JSON.stringify({
                        auth0_id: sub,
                        points: score
                    }),
                });
                const data = await response.json();
                res.status(200).json(data);
            }
        }
        catch (error: any) {
            console.error(error)
            res.status(500).json(error.message);
        }
    }
})