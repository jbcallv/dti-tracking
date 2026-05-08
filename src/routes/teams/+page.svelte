<script>
  import { teams, guards } from '$lib/stub.svelte.js';
  import TeamCard from '$lib/components/TeamCard.svelte';

  let showForm = $state(false);
  let newTeamName = $state('');

  function handleCreate(e) {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    teams.push({
      id: `t${Date.now()}`,
      name: newTeamName.trim(),
      adminId: 'u1',
      memberIds: [],
    });
    newTeamName = '';
    showForm = false;
  }
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-xl font-bold text-white">Teams</h1>
      <p class="text-slate-400 text-sm mt-0.5">{teams.length} teams, {guards.length} total personnel</p>
    </div>
    <button
      onclick={() => showForm = !showForm}
      class="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors"
    >
      + New Team
    </button>
  </div>

  {#if showForm}
    <form onsubmit={handleCreate} class="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6 flex gap-3">
      <input
        bind:value={newTeamName}
        placeholder="Team name..."
        class="flex-1 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors"
      >
        Create
      </button>
      <button
        type="button"
        onclick={() => showForm = false}
        class="px-4 py-2 rounded text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
      >
        Cancel
      </button>
    </form>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each teams as team}
      <TeamCard {team} {guards} />
    {/each}
  </div>
</div>
