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
        {
            path:'detail/1/:movieId',
            components:{
                default:()=>import('@/components/MoviePlaying'), //指向没有名字的路由组件
                detail:()=>import('@/views/Movie/detail')
            },
            props:{
                detail:true
            }
        },
        {
            path:'detail/2/:movieId',
            components:{
                default:()=>import('@/components/Coming'), //指向没有名字的路由组件
                detail:()=>import('@/views/Movie/detail')
            },
            props:{
                detail:true
            }
        },
        {//重定向（遇到找不到的路由，重定向到Movie）
            path : '/Movie',
            redirect : '/Movie/MoviePlaying'
        }
    ]
}