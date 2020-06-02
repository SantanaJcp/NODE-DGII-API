import { ServerConfig } from "./modules/config";

async function main() {
    const server = new ServerConfig({
        routers:[]
    });

    await server.listen();
}

await main();
