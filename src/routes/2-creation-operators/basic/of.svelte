<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { from, Observable, of, Subscriber } from "rxjs";

    const of$ = of(3.14, [1, 2, 3], "abc", Promise.resolve("promiseValue"), () => "hi");

    // of$.subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log("of subscription completed"),
    // });

    function customOf<T>(...args): Observable<T> {
        return new Observable((subscriber: Subscriber<T>) => {
            args.forEach((value) => subscriber.next(value));
            subscriber.complete();
        });
    }

    customOf(3.14, [1, 2, 3], "abc", Promise.resolve("promiseValue"), () => "hi").subscribe({
        next: (value) => console.log(value),
        complete: () => console.log("customOf subscription completed"),
    });
</script>

<section>
    <Page title="Of works" subTitle="(Open devtools)" />
</section>
