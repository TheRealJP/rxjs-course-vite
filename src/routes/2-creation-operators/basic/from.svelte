<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { from, Observable, of } from "rxjs";

    // of example
    const from$ = from("Stone"); // string
    const from1$ = from([1, 2, 3]); // iterable/collection
    // promise
    const from2$ = from(new Promise((resolve, reject) => {
        resolve('resolved')
    }));  
    const from3$ = from(of('of inside from')); // observable inside from

    from$.subscribe({
        next: (value) => console.log(value),
        complete: () => console.log("customOf subscription completed"),
    });

    // how the of operator works
    // function customFrom<T>(array: T[]): Observable<T> {
    //     return new Observable<T>((subscriber) => {
    //         array.forEach((arg) => subscriber.next(arg));
    //         subscriber.complete();
    //     });
    // }

    // customFrom([1, 2, 3]).subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log("customOf subscription completed"),
    // });
</script>

<section>
    <Page title="From works" subTitle="(Open devtools)" />
</section>
