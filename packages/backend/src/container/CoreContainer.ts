import 'reflect-metadata';
import { Container } from "inversify";
import { FetchTwitterAddressBook } from '../idriss/FetchTwitterAddressBook';
import { ResolveTwitterUsernameInteractor } from '../idriss/ResolveTwitterUsernameInteractor';

export class CoreContainer {
    public create() {
        const contaienr = new Container({
            defaultScope: 'Singleton',
        })

        contaienr.bind(FetchTwitterAddressBook).toSelf();
        contaienr.bind(ResolveTwitterUsernameInteractor).toSelf();

        return contaienr;
    }
}
