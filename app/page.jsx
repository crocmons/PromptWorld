import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
       <h1 className="head_text text-center">Discover & Share
       <br className="max-md:hidden" /> 
       <span className="orange_gradient text-center"> AI Powered Prompts</span>
       </h1>
       <p className="desc text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero necessitatibus sed, minus, rem iusto nam corporis optio fugiat veritatis recusandae esse. Distinctio ipsa mollitia quasi suscipit temporibus ullam, magni illo?
       </p>
       {/* Feed */}
       <Feed />
    </section>
  )
}

export default Home