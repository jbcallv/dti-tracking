<script>
  import { Loader } from '@googlemaps/js-api-loader';
  import { PUBLIC_GOOGLE_MAPS_KEY } from '$env/static/public';

  const { guards, sites } = $props();

  const statusColors = {
    'active':   '#10b981',
    'on-break': '#f59e0b',
    'off-duty': '#64748b',
  };

  let mapEl = $state(null);
  let hasKey = $derived(PUBLIC_GOOGLE_MAPS_KEY && PUBLIC_GOOGLE_MAPS_KEY !== 'your_google_maps_api_key_here');

  $effect(() => {
    if (!hasKey || !mapEl) return;

    const loader = new Loader({ apiKey: PUBLIC_GOOGLE_MAPS_KEY, version: 'weekly' });

    loader.load().then(google => {
      const map = new google.maps.Map(mapEl, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14,
        mapTypeId: 'roadmap',
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
        ],
      });

      guards.forEach(guard => {
        new google.maps.Marker({
          position: { lat: guard.lat, lng: guard.lng },
          map,
          title: `${guard.name} (${guard.badgeId})`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: statusColors[guard.status] ?? '#64748b',
            fillOpacity: 1,
            strokeColor: '#0f172a',
            strokeWeight: 2,
          },
          label: { text: guard.name[0], color: '#fff', fontSize: '10px', fontWeight: 'bold' },
        });
      });

      sites.forEach(site => {
        new google.maps.Marker({
          position: { lat: site.lat, lng: site.lng },
          map,
          title: site.name,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#0f172a',
            strokeWeight: 2,
          },
        });
      });
    });
  });
</script>

{#if hasKey}
  <div bind:this={mapEl} class="w-full h-full rounded-lg"></div>
{:else}
  <div class="w-full h-full rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center gap-3">
    <p class="text-slate-300 font-medium">Map Preview Unavailable</p>
    <p class="text-slate-500 text-sm">Add <code class="bg-slate-700 px-1 rounded">PUBLIC_GOOGLE_MAPS_KEY</code> to <code class="bg-slate-700 px-1 rounded">.env</code></p>
  </div>
{/if}
