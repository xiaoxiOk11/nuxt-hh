import { publicStore } from "#imports";
export default defineNuxtRouteMiddleware((to, from) => {
    const usePublcStore = publicStore();
    console.log('usePublcStore',usePublcStore);
    console.log('to', to);
    console.log('--------***************------------');
    console.log("from", from);
    
});
