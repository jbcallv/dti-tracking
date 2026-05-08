<script>
  import { page } from '$app/stores';
  import { session, logout } from '$lib/stub.svelte.js';
  import { goto } from '$app/navigation';

  const { open = false, onClose } = $props();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '#' },
    { href: '/map',       label: 'Live Map',  icon: '@' },
    { href: '/teams',     label: 'Teams',     icon: '*' },
    { href: '/dispatch',  label: 'Dispatch',  icon: '!' },
  ];

  const roleColors = {
    admin:   'text-blue-400 bg-blue-500/10',
    monitor: 'text-amber-400 bg-amber-500/10',
    guard:   'text-emerald-400 bg-emerald-500/10',
  };

  function handleLogout() {
    logout();
    goto('/login');
  }

  function handleNavClick() {
    onClose?.();
  }
</script>

<!-- Mobile backdrop -->
{#if open}
  <div
    class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    role="presentation"
    onclick={onClose}
  ></div>
{/if}

<aside class="
  fixed inset-y-0 left-0 z-40 w-64 flex flex-col
  bg-slate-900 border-r border-slate-700
  transition-transform duration-200 ease-in-out
  {open ? 'translate-x-0' : '-translate-x-full'}
  lg:static lg:translate-x-0 lg:w-56 lg:shrink-0 lg:h-screen lg:sticky lg:top-0
">
  <div class="px-5 py-4 border-b border-slate-700">
    <p class="text-white font-bold tracking-tight text-lg">DTI</p>
    <p class="text-slate-500 text-xs">Security Platform</p>
  </div>

  <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
    {#each navItems as item}
      <a
        href={item.href}
        onclick={handleNavClick}
        class="flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors
          {$page.url.pathname.startsWith(item.href)
            ? 'bg-slate-700 text-white'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'}"
      >
        <span class="text-base w-5 text-center">{item.icon}</span>
        {item.label}
      </a>
    {/each}
  </nav>

  <div class="px-5 py-4 border-t border-slate-700">
    {#if session.user}
      <p class="text-white text-sm font-medium truncate">{session.user.name}</p>
      <p class="text-slate-500 text-xs mb-2">{session.user.badgeId}</p>
      <span class="inline-block px-2 py-0.5 rounded text-xs font-medium capitalize {roleColors[session.user.role] ?? ''}">
        {session.user.role}
      </span>
    {/if}
    <button
      onclick={handleLogout}
      class="mt-3 w-full py-1.5 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
    >
      Sign Out
    </button>
  </div>
</aside>
