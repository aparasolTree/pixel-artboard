export type Fn<A = any, R = any> = (...args: A[]) => R;

export default class EventTarget<EventName extends string> {
    private events: Map<EventName, Set<Fn>> = new Map();

    addEventListener(event: EventName, callback: Fn): Fn;
    addEventListener(event: EventName[], callback: Fn): Fn[];
    public addEventListener(event: EventName | EventName[], callback: Fn): Fn | Fn[] {
        if (Array.isArray(event)) {
            return event.map((e) => {
                return this.addEventListener(e, callback);
            });
        } else {
            let callbacks = this.events.get(event);
            if (!callbacks) {
                this.events.set(event, (callbacks = new Set()));
            }
            callbacks.add(callback);
            return () => {
                this.removeEventListener(event, callback);
            };
        }
    }

    removeEventListener(event: EventName, callback?: Fn): void;
    removeEventListener(event: EventName[], callback?: Fn): void;
    public removeEventListener(event: EventName | EventName[], callback?: Fn): void {
        if (Array.isArray(event)) {
            event.forEach((e) => {
                this.removeEventListener(e, callback);
            });
        } else {
            if (!callback) {
                this.events.delete(event);
            } else {
                const callbacks = this.events.get(event);
                if (callbacks) {
                    callbacks.delete(callback);
                }
            }
        }
    }

    public dispatch(event: EventName, ...args: unknown[]): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => callback(...args));
        }
    }

    public hasEventName(event: EventName): boolean {
        return this.events.has(event);
    }

    public getEventListenerLength(event: EventName): number {
        return this.events.get(event)?.size || 0;
    }
}
