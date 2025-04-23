<script>
    import { supabase } from '$lib/supabase';

    let data = [];
    let error = null;

    // Supabase에서 데이터 가져오기
    const fetchData = async () => {
        const { data: rows, error: fetchError } = await supabase
            .from('candidate') // 테이블 이름
            .select('*'); // 원하는 컬럼 선택

        if (fetchError) {
            error = fetchError.message;
        } else {
            data = rows;
        }
    };

    fetchData();
</script>

{#if error}
    <p>Error: {error}</p>
{:else}          
    <ul class="grid">
        {#each data as row}
        <li class="grid-item">
            <img src="{row.photo}" alt="" width="200px" height="300px">
            <p>{row.name}</p>
        </li>
        {/each}
    </ul>
{/if}

<style>
    .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px;
    }

    .grid-item {
        flex: 1 1 calc(33.333% - 16px);
        box-sizing: border-box;
        text-align: center;
    }

    .grid-item img {
        max-width: 100%;
        height: auto;
    }
</style>