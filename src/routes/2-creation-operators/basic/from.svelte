<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { from, of, throwError } from "rxjs";

    // main difference between of & from
    // of([1, 2, 3], [3, 2, 1]).subscribe((v) => console.log(v));
    // from([1, 2, 3]).subscribe((v) => console.log(v));
    
    // string or other iterable types
    from("God").subscribe((v) => console.log(v));
    
    // not possible to pass primitives like number or boolean
    // from(3).subscribe((v) => console.log(v));
    // from(true).subscribe((v) => console.log(v));

    // array or other collection data structure
    const map = new Map();
    map.set(1, 'Hello');
    map.set(2, 'World');
    from(map).subscribe((v) => console.log(v));
    
    // promise
    from(Promise.reject("promise value")).subscribe({
        next: (v) => console.log(v),
        error: (err) => console.error("promise returned error: ", err),
    });
    
    // another observable
    // of("observable inside from")
    // throwError(() => 'error')
    from(throwError(() => "error")).subscribe({
        next: (v) => console.log(v),
        error: (err) =>
            console.error("observable inside from returned error: ", err),
    });
</script>

<section>
    <Page title="From works" subTitle="(Open devtools)" />
</section>
