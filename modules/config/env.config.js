export class EnvConfig {
    static get(name) {
        return process.env[name];
    }
}
