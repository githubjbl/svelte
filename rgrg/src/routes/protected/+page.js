import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const user = writable(null); // 사용자 정보를 저장하는 store

// 인증 상태 변경 감지
supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        user.set(session.user); // 로그인된 사용자 정보 저장
    } else {
        user.set(null); // 로그아웃 시 null로 설정
    }
});

// 초기 사용자 정보 가져오기
(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    user.set(currentUser); // 초기 사용자 정보 설정
})();