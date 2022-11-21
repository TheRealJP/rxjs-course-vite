<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { catchError, EMPTY, of, throwError } from "rxjs";
    import { fromFetch } from "rxjs/fetch";

    const httpCall$ = fromFetch("https://www.boredapi.com/api/activity?key=5881028", {
        selector: (response) => response.json(),
    });

    // httpCall$.pipe(
    //     catchError((error) => EMPTY),
    // ).subscribe(getFullObserver("catchError"));

    throwError(() => {
        return { error: "Something went wrong" };
    })
        .pipe(
            // main idea: to return values instead of the error itself
            // catchError((error) => of(1, 2, 3)), 
            
            // usually in real life we use this approach
            catchError((error) => of(error)),
            // or
            catchError((error) => {
                console.error(error);
                return EMPTY; // empty observable immediately sends complete notification
            })

            // optional: when we throw another error we still get the initial error
            // catchError(
            //     (error) =>
            //         throwError(() => new Error("We're reaching error levels we never thought possible")).pipe(
            //             catchError((error) => of(error))
            //         )
            // )
        )
        .subscribe(getFullObserver("catchError"));
</script>

<section>
    <Page title="CatchError works" subTitle="(Open devtools)" />
</section>
