<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { peopleMap } from "$utils/constants";
    import type { IPerson } from "$utils/interfaces";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { distinctUntilChanged, distinctUntilKeyChanged, from } from "rxjs";

    /**--- distinctUntilChanged ---*/
    const data: IPerson[] = [
        peopleMap.ninja,
        peopleMap.spy,
        peopleMap.spy,
        peopleMap.spy,
        peopleMap.princess,
        peopleMap.farmer,
        peopleMap.farmer,
    ];

    // no arguments needed in this scenario
    from([2, 2, 2, 1, 4, 4, 3])
        .pipe(distinctUntilChanged())
        .subscribe(getFullObserver("distinctUntilChanged numbers: "));

    // when we need to use arguments
    from(data)
        .pipe(
            // Every new javascript object gets a unique id, so we get a "false positive" effect where the distinctUntilChanged operator thinks every object is unique.
            // However some of the underlying object properties in our data array have duplicates
            distinctUntilChanged(),
            // We can either check one or more object properties on uniqueness
            distinctUntilChanged((previous, current) => previous.age === current.age),
            distinctUntilChanged(
                (previous, current) =>
                    previous.name === current.name ||
                    previous.age === current.age ||
                    previous.profession === current.profession
            ),
            // Or we can check all the object properties on uniqueness like this
            distinctUntilChanged(
                (previous, current) => JSON.stringify(previous) === JSON.stringify(current)
            )
        )
        .subscribe(getFullObserver("distinctUntilChanged object: "));

    /**--- distinctUntilKeyChanged ---*/
    from(data)
        .pipe(distinctUntilKeyChanged("name"))
        .subscribe(getFullObserver("distinctUntilKeyChanged: "));
</script>

<section>
    <Page title="DistinctUntilChanged works" subTitle="(Open devtools)" />
</section>
