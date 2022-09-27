export function invariant(condition: any, foramt: string, ...args: any[]) {
    if (!condition) {
        let error: Error;
        if (foramt === undefined) {
            error = new Error('the second argument cannot be empty');
        } else {
            let argsIndex = 0;
            error = new Error(foramt.replace(/%s/gi, () => args[argsIndex++]));
            error.name = 'Invariant Violation';
        }

        (error as any).framesToPop = 1;
        throw error;
    }
}
