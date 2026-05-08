<script>
  import { goto } from '$app/navigation';
  import { session } from '$lib/stub.svelte.js';
  import { onMount } from 'svelte';

  onMount(() => {
    goto(session.user ? '/dashboard' : '/login');
  });
</script>
