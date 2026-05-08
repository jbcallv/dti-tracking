<script>
  import './layout.css';
  import { session } from '$lib/stub.svelte.js';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';

  const { children } = $props();

  let sidebarOpen = $state(false);

  const isLoginPage = $derived($page.url.pathname === '/login');
  const isAuthenticated = $derived(!!session.user);

  // Close sidebar on route change
  $effect(() => {
    $page.url.pathname;
    sidebarOpen = false;
  });
</script>

{#if isLoginPage || !isAuthenticated}
  {@render children()}
{:else}
  <!-- Mobile top bar -->
  <header class="lg:hidden sticky top-0 z-20 flex items-center gap-3 h-14 px-4 bg-slate-900 border-b border-slate-700">
    <button
      onclick={() => sidebarOpen = true}
      class="text-slate-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded hover:bg-slate-800 transition-colors"
      aria-label="Open menu"
    >
      &#9776;
    </button>
    <span class="text-white font-bold tracking-tight">DTI</span>
    <span class="text-slate-500 text-xs">Security Platform</span>
  </header>

  <div class="flex min-h-screen bg-slate-950 text-white lg:min-h-0 lg:h-screen lg:overflow-hidden">
    <Sidebar open={sidebarOpen} onClose={() => sidebarOpen = false} />
    <main class="flex-1 overflow-auto">
      {@render children()}
    </main>
  </div>
{/if}
