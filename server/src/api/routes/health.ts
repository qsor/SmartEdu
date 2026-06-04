import {Router} from "express";

export function healthRoutes(router: Router) {
    router.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            actor: req.actor,
            timestamp: new Date().toISOString(),
        })
    })

    router.get('/health/ping', (req, res) => {
        res.send('pong')
    })
}
