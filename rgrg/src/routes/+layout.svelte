<script>
    import { user } from '$lib/stores/auth';
    import { supabase } from '$lib/supabase';

    let currentUser;

    // Store 구독
    $: user.subscribe(value => {
        currentUser = value;
    });

    const handleLogout = async () => {
        await supabase.auth.signOut(); // 로그아웃
    };
</script>

<header class="layout-header">
    {#if currentUser}
        <p>Welcome, {currentUser.email}</p>
        <button class="layout-button" on:click={handleLogout}>Logout</button>
    {:else}
        <a href="/login" class="layout-link">로그인</a>
        <a href="/signup" class="layout-link">회원가입</a>
    {/if}
</header>

<main>
    <slot></slot> <!-- 페이지 콘텐츠 렌더링 -->
</main>

<style>
    .layout-header {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
    }

    .layout-button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .layout-button:hover {
        background-color: #0056b3;
    }

    .layout-link {
        color: #007bff;
        text-decoration: none;
        margin-left: 8px;
    }

    .layout-link:hover {
        text-decoration: underline;
    }

    main {
        padding: 16px;
    }
</style>