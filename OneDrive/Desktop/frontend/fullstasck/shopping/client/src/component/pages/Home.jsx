import {
  Container,
  Sidebar,
  Main,
  Card,
  OperationCard,
} from './../imports/importFolder';

const Home = () => {
  return (
    <div className='home'>
      <Container>
        <Sidebar />
        <Main>
          <section className='top-section flow-3'>
            <h1>
              <span>Shoppingify</span> allows you to take your shopping list
              whereever you go
            </h1>
            <div className='search'>
              <span className='material-symbols-outlined'>search</span>
              <input type='text' />
            </div>
          </section>
          <section className='content-section'>
            <div className='flow-2'>
              <h3 className='flow-1'>Fruit and Vegetable</h3>
              <div className='product-container flex  flex-wrap col-gap-1 row-gap-2'>
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
              </div>
            </div>

            <div className='flow-2'>
              <h3 className='flow-1'>Meat</h3>
              <div className='product-container flex  flex-wrap col-gap-1 row-gap-2'>
                <Card product={'Chicken leg box'} />
                <Card product={'Chicken 1kg'} />
                <Card product={'Pork fillets 450g'} />
                <Card product={'Salmon 1kg'} />
              </div>
            </div>

            <div className='flow-2'>
              <h3 className='flow-1'>Beverages</h3>
              <div className='product-container flex  flex-wrap col-gap-1 row-gap-2'>
                <Card product={'Coke'} />
                <Card product={'Pepsi'} />
                <Card product={'Hot chocolate'} />
                <Card product={'Chicken 1kg'} />
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
              </div>
            </div>

            <div className='flow-2'>
              <h3 className='flow-1'>Fruit and Vegetable</h3>
              <div className='product-container flex  flex-wrap col-gap-1 row-gap-2'>
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
              </div>
            </div>

            <div className='flow-2'>
              <h3 className='flow-1'>Fruit and Vegetable</h3>
              <div className='product-container flex  flex-wrap col-gap-1 row-gap-2'>
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
                <Card product={'Avocado'} />
                <Card product={'Banana'} />
                <Card product={'Bunch of carrots 5pcs'} />
                <Card product={'Chicken 1kg'} />
              </div>
            </div>
          </section>
        </Main>
        <OperationCard />
      </Container>
    </div>
  );
};

export default Home;
