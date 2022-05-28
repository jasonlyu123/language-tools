export class EventEmitter {
    private readonly map = new Map<string, Set<(...args: any) => void>>();

    on(name: string, handler: (...args: any[]) => void) {
        let set = this.map.get(name);

        if (!set) {
            set = new Set();
            this.map.set(name, set);
        }

        set.add(handler);
    }

    emit(name: string, ...args: any[]) {
        this.map.get(name)?.forEach(handler => handler(...args));
    }
}