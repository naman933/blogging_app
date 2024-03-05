export const Post = ({posts}) => {
    return (
        <div>
            {posts.map(function(post){
                return( 
                <div>
                    <div className="p-5">
                        <div className="font-catboo text-2xl pb-2">{post.title}</div>
                        <div className="font-winter text-lg pb-2 p-2 rounded-xl outline outline-black">{post.content}</div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

