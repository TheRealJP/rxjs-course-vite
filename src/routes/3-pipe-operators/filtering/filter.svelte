<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { peopleMap } from "$utils/constants";
    import type { IPerson } from "$utils/interfaces";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { filter, from, range, throwError } from "rxjs";

    const data: IPerson[] = [peopleMap.spy, peopleMap.dad, peopleMap.baby, peopleMap.mom];

    // basic use case of the filter operator
    from(data)
        .pipe(filter((person: IPerson) => person.age > 21))
        .subscribe(getFullObserver("filter people"));

    // multiple filters
    from(data)
        .pipe(
            filter((person) => !!person),
            filter((person) => person.age > 21),
            filter((person) => person.profession === "dad" || person.profession === "mom"),
            filter((person) => person.name === "John"),
            // or
            filter(
                (person) =>
                    !!person &&
                    person.age > 21 &&
                    (person.profession === "dad" || person.profession === "mom") &&
                    person.name === "John"
            )
        )
        .subscribe(getFullObserver("filter people"));

    // how errors are handled in most pipe operators by default:
    // the error notification is passed down to the last observer
    throwError(() => "Something went wrong")
        .pipe(filter((person) => !!person))
        .subscribe(getFullObserver("error filter"));

    /**
     * deprecated
     */
    // multiple filter operators
    range(1, 10)
        .pipe(
            filter((value) => !!value),
            filter((value) => value > 3 && value < 7),
            filter((value) => value % 2 === 0)
        )
        .subscribe(getFullObserver("multiple filters"));
</script>

<section>
    <Page title="Filter works" subTitle="(Open devtools)" />
</section>
