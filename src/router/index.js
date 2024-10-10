import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../clients/supabase'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MainPage from '@/views/MainPage.vue' // For regular users
import AdminPage from '@/views/AdminPage.vue' // For admins
import UnauthorizedView from '@/views/UnauthorizedView.vue' // For unauthorized access

let localUser;

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/main',
        name: 'main',
        component: MainPage,
        meta: { requiresAuth: true, role: 'user' } // User role protection
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage,
        meta: { requiresAuth: true, role: 'admin' } // Admin role protection
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: UnauthorizedView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/unauthorized'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Function to get the logged-in user and their role
async function getUserAndRole(next, requiredRole) {
    // Get the current session
    localUser = await supabase.auth.getSession();

    if (localUser.data.session == null) {
        // No user session, redirect to unauthorized
        next('/unauthorized');
    } else {
        const userId = localUser.data.session.user.id;

        // Get the user's role from the user_roles table
        const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('role_name')
            .eq('profile_id', userId)
            .single();

        if (error) {
            console.log('Error fetching role:', error);
            next('/unauthorized');
        } else {
            const userRole = roleData.role_name;

            // Check if the user role matches the required role for the route
            if (requiredRole && requiredRole !== userRole) {
                next('/unauthorized');
            } else {
                next(); // Proceed to the route
            }
        }
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        getUserAndRole(next, to.meta.role);
    } else {
        next(); // No authentication required, proceed
    }
})

export default router;
