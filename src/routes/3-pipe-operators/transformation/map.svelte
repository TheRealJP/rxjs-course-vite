<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { from, map, range } from "rxjs";

    range(1, 5)
        .pipe(
            map((number) => number * 2),
            map((number) => Math.pow(number, 2))
        )
        .subscribe(getFullObserver("number map"));

    // from([
    //     { name: "Summer", age: 17 },
    //     { name: "Jerry", age: 34 },
    //     { name: "Rick", age: 70 },
    // ])
    //     .pipe(map(({ name }) => name))
    //     .subscribe(getFullObserver("get name only map"));
</script>

<section>
    <Page title="Map works" subTitle="(Open devtools)" />
</section>
