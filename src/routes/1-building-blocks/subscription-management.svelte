<script lang="ts">
    import { Observable, Subscription } from "rxjs";
    import {
        numberIntervalObservable$,
        numberObservable$,
        stringIntervalObservable$,
        stringObservable$,
    } from "../../utils/observable-examples";

    /** finite observables */
    // const stringSubscriptionFinite0 = stringObservable$.subscribe({
    //   next: string => console.log('(finite) stringObservable:', string),
    //   complete: () => console.log('(finite) stringObservable: Completed')
    // })
    // const numberSubscriptionFinite1 = numberObservable$.subscribe({
    //   next: number => console.log('(finite) numberObservable:', number),
    //   complete: () => console.log('(finite) numberObservable: Completed')
    // })

    // * unsubscribing finite observables
    // setTimeout(() => {
    //   stringSubscriptionFinite0.unsubscribe()
    // }, 2500)
    // numberSubscriptionFinite1.unsubscribe()

    /** infinite observables */
    // const numberSubscriptionInfinite = numberIntervalObservable$.subscribe(numberInterval => console.log('(infinite) number interval:', numberInterval))
    // const stringSubscriptionInfinite = stringIntervalObservable$.subscribe(stringInterval => console.log('(infinite) string interval:', stringInterval))

    // --- unsubscribe strategies ---
    // one by one
    // grouped
    // (takeUntil)

    // unsubscribing each subscription one by one
    // setTimeout(() => {
    //   console.log('destroying all observable subscriptions one by one')
    //   numberSubscriptionInfinite.unsubscribe()
    //   stringSubscriptionInfinite.unsubscribe()
    //   console.log('There should be no more updates after this point')
    // }, 3000)

    // Collecting all subscription objects in one parent object and unsubscribe that single parent subscription
    // This makes it easier to manage groups of subscriptions that need to be unsubscribed at different times

    // const parentSubscription = new Subscription()
    // parentSubscription.add(numberSubscriptionInfinite);
    // parentSubscription.add(stringSubscriptionInfinite);

    // setTimeout(() => {
    //   console.log('destroying all observable subscriptions in one go')
    //   parentSubscription.unsubscribe();
    //   console.log('There should be no more updates after this point')
    // }, 3000)

    //* unsubscribing a second time, nothing will happen as they are already removed
    // setTimeout(() => {
    //   console.log('destroying all observable subscriptions a second time')
    //   this.parentSubscription.unsubscribe();
    // }, 4000)

    // Using teardown to stop the producer from producing values
    const interval$ = new Observable<number>((subscriber) => {
        let counter = 0;

        const intervalId = setInterval(() => {
            subscriber.next(counter++);
            console.log("Producer value created: ", counter);
        }, 1000);

        return () => {
            console.log("interval$ teardown function activated");
            clearInterval(intervalId);
        };
    });

    const teardownSubscriptionExample = interval$.subscribe((intervalValue) =>
        console.log("Interval emitted: ", intervalValue)
    );

    setTimeout(() => {
        console.log("Unsubscribing from interval$");
        teardownSubscriptionExample.unsubscribe();
    }, 3000);
</script>

<section>
    subscription management works
</section>