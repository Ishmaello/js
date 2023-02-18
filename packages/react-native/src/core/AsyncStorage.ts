import { AsyncStorage as IAsyncStorage } from "@thirdweb-dev/wallets";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = "__TW__";

export class AsyncLocalStorage implements IAsyncStorage {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getItem(key: string) {
        return AsyncStorage.getItem(`${PREFIX}/${this.name}/${key}`)
    }

    setItem(key: string, value: string) {
        return AsyncStorage.setItem(`${PREFIX}/${this.name}/${key}`, value);
    }

    removeItem(key: string) {
        return AsyncStorage.removeItem(`${PREFIX}/${this.name}/${key}`);
    }
}

export function createAsyncLocalStorage(name: string) {
    return new AsyncLocalStorage(name);
}