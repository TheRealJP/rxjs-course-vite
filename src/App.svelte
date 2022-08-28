<script lang="ts">
  import Index from "./routes/index.svelte";
  import NotFound from "./routes/not-found.svelte";
  import Iterator from "./routes/0-fundamentals/iterator-pattern.svelte";
  import Observer from "./routes/0-fundamentals/observer-pattern.svelte";
  import Router from "svelte-spa-router";
  import FundamentalsIndex from "./routes/0-fundamentals/fundamentals-index.svelte";
  import BuildingBlocksIndex from "./routes/1-building-blocks/building-blocks-index.svelte";
  import Basics from "./routes/1-building-blocks/basics.svelte";
  import ObserverNotifications from "./routes/1-building-blocks/observer-notifications.svelte";
  import ProgressBar from "./routes/1-building-blocks/progress-bar.svelte";
  import SubscriptionManagement from "./routes/1-building-blocks/subscription-management.svelte";
  import HotAndCold from "./routes/1-building-blocks/hot-and-cold.svelte";

  let routes = {
    // root
    "/": Index,

    // fundamentals
    "/0-fundamentals/": FundamentalsIndex,
    "/0-fundamentals/iterator": Iterator,
    "/0-fundamentals/observer": Observer,

    // basic building blocks
    "/1-building-blocks/": BuildingBlocksIndex,
    "/1-building-blocks/basics": Basics,
    "/1-building-blocks/observer-notifications": ObserverNotifications,
    "/1-building-blocks/subscription-management": SubscriptionManagement,
    "/1-building-blocks/progress-bar": ProgressBar,
    "/1-building-blocks/hot-and-cold": HotAndCold,

    // operators
    "/2-operators/": FundamentalsIndex,

    // not found
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>

<style></style>
