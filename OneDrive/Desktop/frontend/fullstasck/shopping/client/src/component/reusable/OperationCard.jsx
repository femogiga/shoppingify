import { bottle } from '../imports/importFolder';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  revealControls,
} from '../../features/quantitySlice';

const OperationCard = () => {
  const dispatch = useDispatch();


  const quantities = useSelector((state) => state.quantity.quantities);
  const visible = useSelector((state)=>state.quantity.visible)
  console.log(quantities);
 console.log(visible);
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
          <ProductCard
            id={1}
            productName={'Avocado'}
            quantities={quantities['avocado']}
            onIncrement={() => increment({ productId: 'avocado' })}
            onDecrement={()=>decrement({ productId: 'avocado' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
          <ProductCard
            id={1}
            productName={'chicken'}
            quantities={quantities['chicken']}
            onIncrement={() => increment({ productId: 'chicken' })}
            onDecrement={() => decrement({ productId: 'chicken' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
          <ProductCard
            id={1}
            productName={'bunchOfCarrot'}
            quantities={quantities['bunchOfCarrot']}
            onIncrement={() => increment({ productId: 'bunchOfCarrot' })}
            onDecrement={()=>decrement({ productId: 'bunchOfCarrot' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
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
          <ProductCard
            id={4}
            productName={'chickenLeg'}
            quantities={quantities['chickenLeg']}
            onIncrement={() => increment({ productId: 'chickenLeg' })}
            onDecrement={()=>decrement({ productId: 'chickenLeg' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
          <ProductCard
            id={5}
            productName={'porkFillet'}
            quantities={quantities['porkFillet']}
            onIncrement={() => increment({ productId: 'porkFillet' })}
            onDecrement={()=>decrement({ productId: 'porkFillet' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
          <ProductCard
            id={6}
            productName={'salmon'}
            quantities={quantities['salmon']}
            onIncrement={() => increment({ productId: 'salmon' })}
            onDecrement={()=>decrement({productId: 'salmon' })}
            visible={visible}
            onVisible={() => dispatch(revealControls())}
          />
        </ul>
      </article>
      <form className='form'>
        <input type='text' />
        <button className='save'>Save</button>
      </form>
    </aside>
  );
};

export default OperationCard;
