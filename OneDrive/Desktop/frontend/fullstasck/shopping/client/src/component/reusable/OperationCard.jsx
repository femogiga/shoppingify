import { bottle } from '../imports/importFolder';
import ProductCard from './ProductCard';
const OperationCard = () => {
  return (
    <aside className='operation-card'>
      <article className='bottle-cont flex flow-3'>
        <div className='bottle'>
          <img src={bottle} alt='bottle' />
        </div>
        <div>
          <p className='flow-1'>Didn't find what you need</p>
          <button className='add-item text-orange'>Add item</button>
        </div>
      </article>
      <div className='flex space-between place-items flow-2'>
        <h2>Shopping list</h2>
        <span className='material-symbols-outlined'>edit</span>
      </div>
      <article className='flow-2'>
        <div>
          <p className='flow-2'>Fruits and vegetables</p>
        </div>

        <ul>
          {/* <li className='flex place-items space-between gap-2'>
            <span>Avocado</span>
            <button className='product-button'>3 pc</button>
          </li> */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </article>

      <article>
        <div>
          <p className='flow-2'>Fruits and vegetables</p>
        </div>

        <ul>
          {/* <li className='flex place-items space-between gap-2'>
            <span>Avocado</span>
            <button className='product-button'>3 pc</button>
          </li> */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </article>
    </aside>
  );
};

export default OperationCard;
