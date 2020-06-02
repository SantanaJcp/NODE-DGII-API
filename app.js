import { ServerConfig } from "./modules/config";
import { EnvConfig } from "./modules/config";
import { config } from "dotenv";
import  routers  from './routes'

if (EnvConfig.get("NODE_ENV") !== "production") {
    config();
}

 function main() {
    const port = EnvConfig.get('PORT');
    const server = new ServerConfig({
        port,
        routers
    });

     server.listen();
}

main();
