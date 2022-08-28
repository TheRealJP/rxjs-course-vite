<script lang="ts">
    import Cards from "../../lib/Cards.svelte";
    import { itemCollections } from "../../utils/constants";

    const lessons = itemCollections.OBSERVABLE_LESSONS;
    const title = "Basic building blocks";
</script>

<section>
    <Cards {title} items={lessons} />
</section>
