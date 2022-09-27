import React from 'react';

export type Directive =
    | 'stop'
    | 'prevent'
    | 'self'
    | 'ctrl'
    | 'shift'
    | 'alt'
    | 'meta'
    | 'left'
    | 'middle'
    | 'right'
    | ['exact', ...string[]];
type KeyedEvent = KeyboardEvent | MouseEvent | TouchEvent;

const eventGuards: Record<string, (e: Event) => void | boolean> = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !(e as KeyedEvent).ctrlKey,
    shift: (e) => !(e as KeyedEvent).shiftKey,
    alt: (e) => !(e as KeyedEvent).altKey,
    meta: (e) => !(e as KeyedEvent).metaKey,
    left: (e) => 'button' in e && (e as MouseEvent).button !== 0,
    middle: (e) => 'button' in e && (e as MouseEvent).button !== 1,
    right: (e) => 'button' in e && (e as MouseEvent).button !== 2,
};

export default function withEvent(
    directive: Directive[],
    callback: (event: Event) => void
): React.EventHandler<React.SyntheticEvent<any, Event>> {
    return (event) => {
        for (const modifier in eventGuards) {
            if (directive.includes(modifier as Directive)) {
                const guard = eventGuards[modifier];
                if (guard(event.nativeEvent)) return;
            }
        }

        callback(event.nativeEvent);
    };
}
