<script>
    import Page from "$lib/Page.svelte";
    import { range } from "rxjs";

    // basic usage
    range(1, 3).subscribe((v) => console.log(v));
    range(10, 2).subscribe((v) => console.log(v));
    
    // decimal numbers
    range(2.1, 3).subscribe((v) => console.log(v));
    range(1, 2.2).subscribe((v) => console.log(v)); // length argument is rounded to 3
    
    // negative numbers
    range(-1, 4).subscribe((v) => console.log(v));
    range(10, -1).subscribe((v) => console.log(v));  // doesnt run
</script>

<section>
    <Page title="Range works" subTitle="(Open devtools)" />
</section>
