<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { from, Observable, of } from "rxjs";

    // of example
    const of$ = of(3.14, [1, 2, 3], "a", function hello() {
        return "Helloooo";
    });
    of$.subscribe({
        next: (value) => console.log(value),
        complete: () => console.log("of subscription completed"),
    });

    // how creation operators work
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
