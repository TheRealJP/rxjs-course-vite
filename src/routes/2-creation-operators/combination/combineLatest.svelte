<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { combineLatest, fromEvent, range, timer } from "rxjs";
    import { ajax } from "rxjs/ajax";

    // 3 different observables
    const httpCall$ = ajax<any>("https://www.boredapi.com/api/activity");
    const mouseClick$ = fromEvent<MouseEvent>(document, "click");
    const keyInput$ = fromEvent<KeyboardEvent>(document, "keydown");

    // combineLatest listens to the latest new value in each observable
    const combineLatest$ = combineLatest([httpCall$, mouseClick$, keyInput$]);

    // log results to console
    combineLatest$.subscribe(([httpResponse, mouseClickData, keyInputData]) => {
        console.log({
            httpResponse: httpResponse.response.activity,
            mousePosition: `${mouseClickData.clientX}/${mouseClickData.clientY}`,
            keyboardKey: keyInputData.key,
        });
    });
    
    // testing finite observables   
    const time1$ = timer(3000);
    const time2$ = timer(5000);

    combineLatest([time1$, time2$]).subscribe(([val1, val2]) => {
        console.log('val1:', val1)
        console.log('val2:', val2)
    })
</script>

<section>
    <Page title="CombineLatest works" subTitle="(Open devtools)" />
</section>
