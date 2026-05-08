<script>
  import { guards, sites } from '$lib/stub.svelte.js';
  import MapView from '$lib/components/MapView.svelte';
</script>

<div class="flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen p-4 lg:p-6">
  <div class="mb-3">
    <h1 class="text-xl font-bold text-white">Live Map</h1>
    <p class="text-slate-400 text-sm mt-0.5">Real-time guard positions and site locations</p>
  </div>

  <div class="flex flex-wrap gap-3 mb-3 text-sm">
    <span class="flex items-center gap-1.5 text-slate-400">
      <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Active
    </span>
    <span class="flex items-center gap-1.5 text-slate-400">
      <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> On Break
    </span>
    <span class="flex items-center gap-1.5 text-slate-400">
      <span class="w-3 h-3 rounded-full bg-slate-500 inline-block"></span> Off Duty
    </span>
    <span class="flex items-center gap-1.5 text-slate-400">
      <span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Site
    </span>
  </div>

  <div class="flex-1 min-h-0">
    <MapView {guards} {sites} />
  </div>
</div>
