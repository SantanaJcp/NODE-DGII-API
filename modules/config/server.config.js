import express from 'express';
import {EnvConfig} from "./env.config";

export class ServerConfig {
    constructor({routers}) {
        this.app = express();
        this.app.set('env', EnvConfig.get('NODE_ENV'));
        this.app.set('port', EnvConfig.get('PORT'));
        this.registerJsonMiddleware()

        if (routers) {
            routers.forEach(({baseUrl,router}) => {
               this.registerRouter(baseUrl,router);
            });
        }

        this.registerNotFoundMiddleware().registerErrorHandlingMiddleware();

    }

    registerJsonMiddleware() {
        this.registerMiddleware(express.json());
        return this;
    }

    registerMiddleware(middleware) {
        this.app.use(middleware);
        return this;
    }

    registerRouter(baseUrl, router) {
        this.app.use(baseUrl, router);
        return this;
    }

    registerNotFoundMiddleware() {
        this.registerMiddleware((req, res) =>
            res.status(404).json({
                message: "Resource not found",
                statusCode: 404
            })
        );

        return this;
    }

    registerErrorHandlingMiddleware() {
        if (this.app.get("env") === "development") {
            this.registerMiddleware(
                ({ statusCode = 500, message, stack }, req, res) => {
                    return res.status(statusCode).json({
                        statusCode,
                        message,
                        stack
                    });
                }
            );
        } else {
            this.registerMiddleware(
                ({ statusCode = 500, message }, req, res) => {
                    res.status(statusCode).json({ statusCode, message });
                }
            );
        }

        return this;
    }

    async listen() {
        try {

            this.app.listen(this.port, () =>
                console.log(`App on port: ${this.port}`)
            );
        } catch (error) {
            console.log(error);
            console.error(`Error message: ${error.message}`);
        }
    }
}

