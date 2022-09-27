<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { Observable, of } from "rxjs";

    // of example
    // const of$ = of(1, 2, 3, [1, 2, 3], "a", "b", "c");
    // of$.subscribe({
    //     next: value => console.log(value),
    //     complete: () => console.log('customOf subscription completed'),
    // });

    // how the of operator works
    function customOf<T>(...args: T[]): Observable<T> {
        return new Observable<T>((subscriber) => {
            args.forEach(arg => subscriber.next(arg));
            subscriber.complete()
        });
    }

    customOf([1, 2, 3], [3, 2, 1], [4, 5, 4]).subscribe({
        next: value => console.log(value),
        complete: () => console.log('customOf subscription completed'),
    })
</script>

<section>
    <Page title="Of works" subTitle="(Open devtools)" />
</section>
