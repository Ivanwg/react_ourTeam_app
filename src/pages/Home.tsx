import CardsList from "../components/CardsList";
import Header from "../components/Header";
import Layout from "../components/Layout";

const Home = () => {
  return ( 
    <>
      <Header>
        <div className='dc-center'>
          <h1 className='mb-16 white-color title'>Наша команда</h1>
          <p className='mw-846 gray-color desc'>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p>
        </div>
      </Header>
      <Layout>
        <CardsList />
      </Layout>
    </>
   );
}
 
export default Home;