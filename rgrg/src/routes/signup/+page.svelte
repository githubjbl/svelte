<script>
    import { supabase } from '$lib/supabase';

    let email = '';
    let nickname = ''; // 추가된 필드
    let password = '';
    let confirmPassword = '';
    let birth = '';
    let gender = ''; // 숫자로 저장
    let address = '';
    let interest = ''; // 텍스트 입력으로 변경

    let error = null;
    let success = null;

    const handleSignup = async () => {
        error = null;
        success = null;

        if (password !== confirmPassword) {
            error = 'Passwords do not match!';
            return;
        }

        const { data, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    user_metadata: { // 사용자 메타데이터에 추가 데이터 저장
                        nickname,
                        birth,
                        gender: parseInt(gender), // gender 값을 숫자로 변환
                        address,
                        interest
                    }
                }
            }
        });

        if (signupError) {
            error = signupError.message;
        } else {
            success = 'Signup successful! Please check your email for verification.';
        }
    };
</script>

<form on:submit|preventDefault={handleSignup}>
    <h1>Sign Up</h1>

    <label>
        Nickname:
        <input type="text" bind:value={nickname} required />
    </label>

    <label>
        Email:
        <input type="email" bind:value={email} required />
    </label>

    <label>
        Password:
        <input type="password" bind:value={password} required />
    </label>

    <label>
        Confirm Password:
        <input type="password" bind:value={confirmPassword} required />
    </label>

    <label>
        Birth Year:
        <input type="number" bind:value={birth} min="1900" max="2025" required />
    </label>

    <label>
        Gender:
        <input type="radio" bind:group={gender} value="1" required /> Male
        <input type="radio" bind:group={gender} value="2" required /> Female
    </label>

    <label>
        Address:
        <input type="text" bind:value={address} required />
    </label>

    <label>
        Interest:
        <input type="text" bind:value={interest} required /> <!-- 텍스트 입력 필드 -->
    </label>

    <button type="submit">Sign Up</button>

    {#if error}
        <p style="color: red;">Error: {error}</p>
    {/if}

    {#if success}
        <p style="color: green;">{success}</p>
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