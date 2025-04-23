<script>
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = null;

    const handleLogin = async () => {
        error = null;

        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) {
            error = loginError.message;
        } else {
            // 로그인 성공 시 메인 페이지로 이동
            goto('/');
        }
    };
</script>

<form on:submit|preventDefault={handleLogin}>
    <h1>Login</h1>

    <label>
        Email:
        <input type="email" bind:value={email} required />
    </label>

    <label>
        Password:
        <input type="password" bind:value={password} required />
    </label>

    <button type="submit">Login</button>

    {#if error}
        <p style="color: red;">Error: {error}</p>
    {/if}
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin: 0 auto;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>