import React from "react";

const KeyReg = /^(meta|ctrl|shift|alt)?\+?([a-zA-Z])$/i;
export type Modifier = "altKey" | "shiftKey" | "ctrlKey" | "metaKey";

export default function useKeyDown(keyStr: string, callback: Function) {
    if (!KeyReg.test(keyStr)) return;
    React.useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            const [, modifier, key] = keyStr.match(KeyReg)!;
            if (modifier) {
                const modifyKey = (modifier.toLowerCase() + "Key") as Modifier;
                if (event[modifyKey] && key === event.key) {
                    callback(event);
                }
            } else if (event.key === key) callback(event);
        };
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [keyStr, callback]);
}
