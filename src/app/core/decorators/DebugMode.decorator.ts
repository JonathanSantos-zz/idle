
export const DebugMode = function (activated: boolean = true): Function {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (activated) {
                console.log('============ Method: ' + propertyKey + ' ============');
                console.log('inputs: ' + JSON.stringify(args, null, '\t'));
            }

            const result = originalMethod.apply(this, args);

            if (activated) {
                console.log('outputs: ' + JSON.stringify(result, null, '\t'));
                console.log('========== ' + propertyKey + ' end execution ========');
            }

            return result;
        };

        return descriptor;
    }
};
