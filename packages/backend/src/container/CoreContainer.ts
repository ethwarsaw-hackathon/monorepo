import { Container } from "inversify";

export class CoreContainer {
    public create() {
        return new Container({
            defaultScope: 'Singleton',
        })
    }
}