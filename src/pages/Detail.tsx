import { Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Layout from '../components/Layout';
import UserFace from '../components/UserFace';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { getRandomPhoneNumbers } from '../utils/randomPhone';
import Spinner from '../components/Spinner';


const Detail = () => {
  const collegues = useSelector((state: RootState) => state.collegues.collegues);
  const mounted = useSelector((state: RootState) => state.collegues.mounted);
  const location = useLocation();
  let pageId: string | number = location.pathname.split('/')[2];
  if (!pageId.match(/\d+/g)) {
    return <Navigate to='/'/>
  }
  pageId = Number(pageId);
  const collegue = collegues.find(obj => obj.id === pageId);
  if (!collegue && mounted) {
    return <Navigate to='/'/>
  } else if (!collegue) {
    return <Spinner additionalClassNames={['onAllViewPort']} />
  }
  const tel = getRandomPhoneNumbers();
  return ( 
    <>
      <Header resized={true}>
        <UserFace id={collegue.id} name={[collegue.first_name, collegue.last_name].join(' ')} avatar={collegue.avatar} />
      </Header>
      <Layout>
        <div className='user-content'>
          <div className='user-content__desc'>
            Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
            <br />
            <br />
            В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
            <br />
            <br />
            Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
          </div>
          <div className='user-content__contacts'>
            <a href={`tel:${tel.pure}`} className='user-content__contact tel'>{tel.formatted}</a>
            <a href={`mailto:  ${collegue.email}`} className='user-content__contact mail'>{collegue.email}</a>
          </div>
        </div>
      </Layout>
    </>
   );
}
 
export default Detail;