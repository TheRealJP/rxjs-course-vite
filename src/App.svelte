<script lang="ts">
  import Index from "./routes/index.svelte";
  import NotFound from "./routes/not-found.svelte";
  import Iterator from "./routes/0-fundamentals/iterator.svelte";
  import Observer from "./routes/0-fundamentals/observer.svelte";
  import Router from "svelte-spa-router";
  import FundamentalsIndex from "./routes/0-fundamentals/fundamentals-index.svelte";
  let routes = {
    "/": Index,

    // fundamentals
    "/0-fundamentals/": FundamentalsIndex,
    "/0-fundamentals/iterator": Iterator,
    "/0-fundamentals/observer": Observer,

    // basic building blocks
    "/1-building-blocks/": FundamentalsIndex,

    // Not found
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>

<style></style>
