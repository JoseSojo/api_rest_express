import { RUN_SERVER } from './server.js';

const PORT = process.env.PORT || 3145; // PORT RUNNING SERVER
const server = RUN_SERVER();

/**
 * RUNNING SERVER
 */
server.listen(PORT, () => {
    console.log(`
        SERVER ON PORT ${PORT} 
        run in http://127.0.0.1:${PORT}
        close press [Ctrl] + [c]  `)
})
