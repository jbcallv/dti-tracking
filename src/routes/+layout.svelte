<script>
  import './layout.css';
  import { session } from '$lib/stub.svelte.js';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';

  const { children } = $props();

  const isLoginPage = $derived($page.url.pathname === '/login');
  const isAuthenticated = $derived(!!session.user);
</script>

{#if isLoginPage || !isAuthenticated}
  {@render children()}
{:else}
  <div class="flex min-h-screen bg-slate-950 text-white">
    <Sidebar />
    <main class="flex-1 overflow-auto">
      {@render children()}
    </main>
  </div>
{/if}
