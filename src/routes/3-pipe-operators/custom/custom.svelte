<script>
    // // simple custom operator example -> only use in the custom operator lesson
// function myMapOperator<A, B>(fn: (value: A) => B): OperatorFunction<A, B> {
//     return (source: Observable<A>) =>
//         new Observable<B>((subscriber) => {
//             source.subscribe({
//                 next: (value) => subscriber.next(fn(value)),
//                 error: (err) => subscriber.error(err),
//                 complete: () => subscriber.complete(),
//             });
//         });
// }
// interval$.pipe(myMapOperator((val) => val.toString())).subscribe();

// function myCustomOperator(): OperatorFunction {
//     return (source: Observable) => new Observable((subscriber) => {subscriber.next()})
// }

// export interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {}
</script>