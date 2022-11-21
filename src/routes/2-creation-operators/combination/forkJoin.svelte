<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { forkJoin, throwError, timer } from "rxjs";
    import { fromFetch } from "rxjs/fetch";

    // --- observables to combine in the forkJoin operator ---
    // finite
    const activity1$ = fromFetch("https://www.boredapi.com/api/activity?key=5881028", {
        selector: (response) => response.json(),
    });
    const activity2$ = fromFetch("https://www.boredapi.com/api/activity?key=9008639", {
        selector: (response) => response.json(),
    });
    const error$ = throwError(() => "Something went wrong");
    // infinite
    const timerInterval1$ = timer(0, 2000);
    const timerInterval2$ = timer(0, 4000);

    // --- forkJoin with finite observables ---
    const forkJoinDefault$ = forkJoin([activity1$, activity2$]);
    // forkJoinDefault$.subscribe((activities) => console.log(activities));

    // destructured array values
    // forkJoinDefault$.subscribe({
    //     next: ([activity1, activity2]) => {
    //         console.log(
    //             `I'm going to ${activity1.activity?.toLowerCase()} and ${activity2.activity?.toLowerCase()}`
    //         );
    //     },
    //     complete: () => console.log("forkJoin completed!"),
    // });

    // --- forkJoin with infinite observables ---
    const forkJoinInfinite$ = forkJoin([timerInterval1$, timerInterval2$]);
    // forkJoinInfinite$.subscribe(getFullObserver("infinite"));

    // --- forkJoin with finite and infinite observables ---
    const forkJoinMixed$ = forkJoin([activity1$, timerInterval1$]);
    // forkJoinMixed$.subscribe(getFullObserver("finite and infinite"));

    // --- forkJoin with finite and error observables ---
    const forkJoinError$ = forkJoin([activity1$, error$]);
    forkJoinError$.subscribe(getFullObserver("finite & error"));

    // --- forkJoin empty array ---
    const forkJoinEmpty$ = forkJoin([]);
    forkJoinEmpty$.subscribe(getFullObserver("empty array"));
</script>

<section>
    <Page title="ForkJoin works" subTitle="(Open devtools)" />
</section>
