export const Post = ({posts}) => {
    return (
        <div>
            {posts.map(function(post){
                return( 
                <div className="p-5">
                    <div className="font-mono text-2xl pb-2">{post.title}</div>
                    <div className="font-barcelony text-lg pb-2 border-2 p-2 rounded-xl bg-black text-white">{post.content}</div>
                </div>
                )
            })}
        </div>
    )
}

