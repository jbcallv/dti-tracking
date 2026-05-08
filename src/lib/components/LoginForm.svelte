<script>
  import { login } from '$lib/stub.svelte.js';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let error = $state('');

  function handleSubmit(e) {
    e.preventDefault();
    error = '';
    const ok = login(email, password);
    if (ok) {
      goto('/dashboard');
    } else {
      error = 'Invalid email or password.';
    }
  }
</script>

<div class="min-h-screen bg-slate-900 flex items-center justify-center">
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <p class="text-3xl font-bold text-white tracking-tight">DTI</p>
      <p class="text-slate-400 text-sm mt-1">Security Dispatch Platform</p>
    </div>

    <form onsubmit={handleSubmit} class="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
      <div>
        <label for="email" class="block text-slate-400 text-sm mb-1">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="admin@dti.com"
          class="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label for="password" class="block text-slate-400 text-sm mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="password"
          class="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {#if error}
        <p class="text-red-400 text-sm">{error}</p>
      {/if}

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-2 text-sm font-medium transition-colors"
      >
        Sign In
      </button>

      <p class="text-slate-600 text-xs text-center">
        Try: admin@dti.com / monitor@dti.com / guard@dti.com &mdash; password: password
      </p>
    </form>
  </div>
</div>
