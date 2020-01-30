export default {
    path:'/Movie',
    component : () => import('@/views/Movie'),
    //配二级路由(这里是点击喵喵电影获得的界面)
    children: [
        {
            path:'City',
            component:() => import('@/components/City')
           
        },
        {
            path:'Coming',
            component:() => import('@/components/Coming')
           
        },
        {
            path:'MoviePlaying',
            component:() => import('@/components/MoviePlaying')
           
        },
        {
            path:'Search',
            component:() => import('@/components/Search')
           
        },
        {//重定向（遇到找不到的路由，重定向到Movie）
            path : '/Movie',
            redirect : '/Movie/MoviePlaying'
        }
    ]
}