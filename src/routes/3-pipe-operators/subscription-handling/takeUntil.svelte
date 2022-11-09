<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { timer, interval, type OperatorFunction, Observable, Subscriber, EMPTY } from "rxjs";
    import { first, take, takeUntil } from "rxjs/operators";

    // sources: 
    // https://benlesh.medium.com/rxjs-dont-unsubscribe-6753ed4fda87
    // https://bytethisstore.com/articles/pg/rxjs-unsubscribe


    const timer$ = timer(5000);
    const interval1$ = interval(1000);
    const interval2$ = interval(1000);
    const interval3$ = interval(1000);

    /** --- classic unsubscribe --- */
    // const subscription = interval1$.subscribe(getFullObserver('classic unsubscription'))
    // timer$.subscribe(() => subscription.unsubscribe())

    /** --- takeUntil --- */
    // more efficient way to "unsubscribe", 
    // it takes less effort to write and manage. 
    // We dont have to keep track of each single subscription. 
    // Instead we unsubscribe all subscriptions when the given observable emits a value (in this case a timer but could be anything)
    // This is the most used way to destroy subscriptions
    interval1$.pipe(takeUntil(timer$)).subscribe(getFullObserver("interval takeUntil 1"));
    interval2$.pipe(takeUntil(timer$)).subscribe(getFullObserver("interval takeUntil 2"));
    interval3$.pipe(takeUntil(timer$)).subscribe(getFullObserver("interval takeUntil 3"));

    /** --- first & take --- */
    // another efficient way to unsubscribe is by using the take or first operator
    // they only take a certain amount of values until they destroy the observable
    // first operator takes the first incoming value and take can take as many
    // interval1$.pipe(first()).subscribe(getFullObserver('first'));
    // interval1$.pipe(take(1)).subscribe(getFullObserver('take 1'));

    // how do first & take behave when we pass an empty observable?
    // EMPTY.pipe(first()).subscribe(getFullObserver('first EMPTY'));
    // EMPTY.pipe(take(1)).subscribe(getFullObserver('take 1 EMPTY'));
</script>

<section>
    <Page title="TakeUntil works" subTitle="(Open devtools)" />
</section>
